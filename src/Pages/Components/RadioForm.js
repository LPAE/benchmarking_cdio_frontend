import React from 'react';
import { Grid, Box, Typography, Radio, Collapse, Popover, Paper, Hidden, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  titulo: {
    paddingTop: '16px'
  },
  textoDescricao: {
    fontSize: '0.55rem'
  },
  tooltip: {

  },
  popover: {
    pointerEvents: 'none',
    width: '80%'
  },
  popoverTexto: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
  },
  textoIndicador: {
    'line-height': '1.1'
  },
  AreaFormItemPaper: {
    borderRadius: '15px'
    //height: theme.spacing(8)
  },
  rowBox: {
    borderBottom: '1px solid rgba(0,0,0,0.15)'
  },
  headerRowBox: {
    borderBottom: '3px solid rgba(0,0,0,0.4)'
  },
  radio: {
    padding: '4px'
  }
});

const RadioGroup = props => (
  <>
    {props.column.map(numero => (
      <Grid item xs={props.gridSize} key={numero}>
        <Grid container justify="center">
          <Radio
            name={props.name}
            checked={props.checked === numero}
            value={numero}
            onChange={props.onChange}
            className={props.classes.radio}
          />
        </Grid>
      </Grid>
    ))}
  </>
);

const RadioFormHeader = props => (
  <Grid container>
    <Grid item xs={12}>
      <Box mt={1} mx={2} px={1} className={props.classes.headerRowBox}>
        <Grid container justify="center" alignItems="center">
          {props.header.map((item, index) => (
            <Grid
              item
              xs={index === 0 ? 12 : props.gridSize}
              sm={props.gridSize}
              key={item}
              style={props.hideIndex && index === 0 ? { visibility: 'collapse' } : {}}
            >
              <Typography color="textSecondary" align="center" variant="h5">
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  </Grid>
);

const RadioFormDescricao = props => {
  const { index, actualIndex, descricao } = props;
  return (
    <Hidden xsDown>
      <Grid container spacing={2} justify="center" alignItems="flex-start">
        {descricao.map((item, i) => (
          <Grid item xs={[2, 3, 4, 3][i]} key={i}>
            <Collapse component={Grid} in={index === actualIndex}>
              <Typography variant="body2" align={i === 1 ? 'left' : i === 2 ? 'center' : 'right'}>
                {item}
              </Typography>
            </Collapse>
          </Grid>
        ))}
      </Grid>
    </Hidden>
  );
};

export default withStyles(styles)(
  class RadioForm extends React.Component {
    state = {
      actualIndex: 0,
      clicked: [],
      popoverOpen: null,
      anchorEl: null
    };

    radioCallback = (onChangeCallback, row, stateName, e) => {
      const name = e.target.name.split('_')[1];
      var actualIndex = this.state.actualIndex;
      var clicked = this.state.clicked;

      if (actualIndex < row.length && name === row[actualIndex]) {
        actualIndex++;
        while (actualIndex < row.length && clicked.includes(row[actualIndex])) {
          actualIndex++;
        }
      }

      clicked.push(name);
      this.setState({ ...this.state, actualIndex, clicked });
      onChangeCallback(stateName, e);
    };

    handlePopoverOpen = event => {
      this.setState({ ...this.state, popoverOpen: event.target.id, anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
      this.setState({ ...this.state, popoverOpen: null, anchorEl: null });
    };

    render() {
      const {
        classes,
        row,
        header,
        state,
        stateName,
        hideIndex,
        mostrarDescricao,
        descricao,
        textoIndicador,
        onChangeCallback
      } = this.props;
      const [, ...column] = header;

      return (
        <Paper elevation={3}>
          <RadioFormHeader header={header} gridSize={12 / header.length} hideIndex={hideIndex} classes={classes} />
          <Grid container direction="column" wrap="nowrap">
            {row &&
              row.map((item, index) => (
                <Box mb={0} mx={2} p={1} key={index} className={classes.rowBox}>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} sm={12 / header.length} style={hideIndex ? { visibility: 'collapse' } : {}}>
                      <Tooltip placement="right" title={textoIndicador[index]} className={classes.tooltip}> 
                        <Typography variant="body1" id={`${stateName}_${item}`} align="center" className={classes.textoIndicador}>
                          {item}
                        </Typography>
                      </Tooltip>
                      <Popover
                        className={classes.popover}
                        open={this.state.popoverOpen === `${stateName}_${item}`}
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
                        <Typography variant="body1" className={classes.popoverTexto}>
                          {textoIndicador[index]}
                        </Typography>
                      </Popover>
                    </Grid>
                    <RadioGroup
                      column={column}
                      name={`${stateName}_${item}`}
                      checked={state[item]}
                      gridSize={12 / header.length}
                      onChange={e => this.radioCallback(onChangeCallback, row, stateName, e)}
                      classes={classes}
                    />
                  </Grid>

                  {mostrarDescricao && (
                    <RadioFormDescricao descricao={descricao[index]} index={index} actualIndex={this.state.actualIndex} classes={classes} />
                  )}
                </Box>
              ))}
          </Grid>
        </Paper>
      );
    }
  }
);
