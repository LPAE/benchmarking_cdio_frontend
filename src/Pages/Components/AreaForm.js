import React from 'react';
import { Grid, Box, Typography, Radio, Collapse, Popover, Paper, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import RadioForm from './RadioForm';

const styles = theme => ({
  titulo: {
    paddingTop: '16px'
  },
  textoDescricao: {
    fontSize: '0.7rem'
  },
  popover: {
    pointerEvents: 'none',
    width: '80%'
  },
  popoverTexto: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3)
  },
  textoIndicador: {
    'line-height': '1.1'
  },
  AreaFormItemPaper: {
    borderRadius: '15px'
    //height: theme.spacing(8)
  }
});

const RadioGroup = props => (
  <>
    {props.column.map(numero => (
      <Grid item xs={props.gridSize} key={numero}>
        <Grid container justify="center">
          <Radio name={props.name} checked={props.checked === numero} value={numero} onChange={props.onChange} />
        </Grid>
      </Grid>
    ))}
  </>
);

const AreaFormHeader = props => (
  <Grid container>
    <Grid item xs={12}>
      <Box mt={1} mx={2} px={1}>
        <Grid container justify="center" alignItems="center">
          {props.header.map((item, index) => (
            <Grid
              item
              xs={index === 0 ? 12 : 2}
              sm={props.gridSize}
              key={item}
              style={props.hideIndex && index === 0 ? { visibility: 'collapse' } : {}}
            >
              <Typography color="textSecondary" align="center" variant="h6">
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  </Grid>
);

const AreaFormDescricao = props => {
  const { item, index, actualIndex, mostrarDescricao, classes } = props;
  return (
    <Hidden xsDown>
      <Grid container spacing={3} justify="center" alignItems="flex-start">
        {mostrarDescricao &&
          ['', item.descricao1, item.descricao2, item.descricao3].map((item, i) => (
            <Grid item xs={i === 0 ? 2 : i === 1 || i === 3 ? 3 : 4} key={i}>
              <Collapse component={Grid} in={index === actualIndex}>
                <Typography variant="body2" align={i === 1 ? 'left' : i === 2 ? 'center' : 'right'} className={classes.textoDescricao}>
                  {item}
                </Typography>
              </Collapse>
            </Grid>
          ))}
      </Grid>
    </Hidden>
  );
};

const RaadioForm = props => {
  const { classes, row, header, state, stateName, onChange, hideIndex } = props;
  const [, ...column] = header;
  return (
    <>
      <AreaFormHeader header={header} gridSize={12 / header.length} hideIndex={hideIndex} />

      <Grid container direction="column" wrap="nowrap">
        {row &&
          row.map((item, index) => (
            <Box clone mb={1} mx={2} p={1} key={index}>
              <Paper elevation={3}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} sm={12 / header.length} style={hideIndex ? { visibility: 'collapse' } : {}}>
                    <Typography id={`${stateName}_${item}`} align="center" className={classes.textoIndicador}>
                      {item}
                    </Typography>
                  </Grid>
                  <RadioGroup
                    column={column}
                    name={`${stateName}_${item}`}
                    checked={state[item]}
                    gridSize={12 / header.length}
                    onChange={e => onChange(stateName, e)}
                  />
                </Grid>
              </Paper>
            </Box>
          ))}
      </Grid>
    </>
  );
};

export default withStyles(styles)(
  class AreaForm extends React.Component {
    state = {
      actualIndex: 0,
      clicked: [],
      popoverOpen: null,
      anchorEl: null
    };

    radioCallback = e => {
      const name = e.target.name.split('_')[1];
      var actualIndex = this.state.actualIndex;
      var clicked = this.state.clicked;

      if (actualIndex < this.props.area.item.length && name === this.props.area.item[actualIndex].indicador) {
        actualIndex++;
        while (actualIndex < this.props.area.item.length && clicked.includes(this.props.area.item[actualIndex].indicador)) {
          actualIndex++;
        }
      }

      clicked.push(name);
      this.setState({ ...this.state, actualIndex, clicked });
      this.props.onChange(this.props.stateName, e);
    };

    handlePopoverOpen = event => {
      this.setState({ ...this.state, popoverOpen: event.target.id, anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
      this.setState({ ...this.state, popoverOpen: null, anchorEl: null });
    };

    render() {
      const { classes, area, state, stateName, mostrarDescricao, onChange, stateMetrica, stateNameMetrica } = this.props;

      return (
        <Grid container direction="column" alignItems="center" className="AreaForm">
          <Grid item className={classes.titulo}>
            <Typography justify="center" variant="h5">
              Área: {area.titulo}
            </Typography>
          </Grid>

          <RaadioForm
            row={Object.keys(area.item)}
            header={['Indicador', 'Prática', 'Performance']}
            state={stateMetrica}
            stateName={stateNameMetrica}
            onChange={onChange}
            classes={classes}
          />

          <RadioForm
            row={['pro', 'sec', 'tei', 'qua', 'qui']}
            header={['Indicador', 'Prática', 'Performance']}
            mostrarDescricao = {mostrarDescricao}
            descricao={['', 'aasd a a aa', 'asa sdfds s ds', 'asdasdf asfs dfdf f']}
            textoIndicador={['a pri', 'a sec', 'a tr']}
            state={stateMetrica}
            stateName={stateNameMetrica}
            onChangeCallback={onChange}
          />

          <AreaFormHeader header={['Indicador', '1', '2', '3', '4', '5']} gridSize={2} />
          <Grid container direction="column" wrap="nowrap">
            {area.item &&
              area.item.map((item, index) => (
                <Box clone mb={1} mx={2} p={1} key={item.indicador}>
                  <Paper elevation={3} className={classes.AreaFormItemPaper}>
                    <Grid container justify="center" alignItems="center">
                      <Grid item xs={12} sm={2}>
                        <Typography
                          id={`${stateName}_${item.indicador}`}
                          onMouseEnter={this.handlePopoverOpen}
                          onMouseLeave={this.handlePopoverClose}
                          align="center"
                          className={classes.textoIndicador}
                        >
                          {item.indicador}
                        </Typography>
                        <Popover
                          className={classes.popover}
                          open={this.state.popoverOpen === `${stateName}_${item.indicador}`}
                          anchorEl={this.state.anchorEl}
                          anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left'
                          }}
                          onClose={this.handlePopoverClose}
                          disableRestoreFocus
                        >
                          <Typography className={classes.popoverTexto}>{item.textoIndicador}</Typography>
                        </Popover>
                      </Grid>
                      <RadioGroup
                        column={['1', '2', '3', '4', '5']}
                        name={`${stateName}_${item.indicador}`}
                        checked={state[item.indicador]}
                        gridSize={2}
                        onChange={this.radioCallback}
                      />
                    </Grid>

                    {mostrarDescricao && (
                      <AreaFormDescricao item={item} index={index} actualIndex={this.state.actualIndex} {...this.props} />
                    )}
                  </Paper>
                </Box>
              ))}
          </Grid>
        </Grid>
      );
    }
  }
);
