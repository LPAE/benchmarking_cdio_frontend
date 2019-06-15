import React from 'react';
import { Grid, Box, Typography, Radio, Collapse, Popover, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {},
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
  }
});

const RadioGroup = props => (
  <>
    {['1', '2', '3', '4', '5'].map(numero => (
      <Grid item xs={2} key={numero}>
        <Grid container justify="center">
          <Radio name={props.name} checked={props.checked === numero} value={numero} onChange={props.onChange} />
        </Grid>
      </Grid>
    ))}
  </>
);

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
      const { classes } = this.props;
      return (
        <Grid container direction="column" alignItems="center" className="AreaForm">
          <Grid item>
            <Typography justify="center" variant="h5">
              Área: {this.props.area.titulo}
            </Typography>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Box mt={1} mx={2} px={1}>
                <Grid container>
                  {['Indicador', '1', '2', '3', '4', '5'].map(item => (
                    <Grid item xs={2} key={item}>
                      <Typography color="textSecondary" align="center" variant="h6">
                        {item}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              {this.props.area.item &&
                this.props.area.item.map((item, index) => (
                  <Box clone mt={1} mb={2} mx={2} px={1} pb={2}>
                    <Paper elevation={3}>
                      <Grid container justify="center" alignItems="center" key={item.indicador}>
                        <Grid item xs={2} key={item} justify="center">
                          <Typography
                            id={`${this.props.stateName}_${item.indicador}`}
                            onMouseEnter={this.handlePopoverOpen}
                            onMouseLeave={this.handlePopoverClose}
                          >
                            {item.indicador}
                          </Typography>
                          <Popover
                            className={classes.popover}
                            open={this.state.popoverOpen === `${this.props.stateName}_${item.indicador}`}
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
                          name={`${this.props.stateName}_${item.indicador}`}
                          checked={this.props.state[item.indicador]}
                          onChange={this.radioCallback}
                        />
                      </Grid>

                      <Grid container spacing={3} justify="center" alignItems="flex-start">
                        {this.props.mostrarDescricao &&
                          ['', item.descricao1, item.descricao2, item.descricao3].map((item, i) => (
                            <Grid item xs={i === 0 ? 2 : i === 1 || i === 3 ? 3 : 4} key={i} alignItems="center">
                              <Collapse component={Grid} in={index === this.state.actualIndex}>
                                <Typography
                                  variant="body2"
                                  align={i === 1 ? 'left' : i === 2 ? 'center' : 'right'}
                                  className={classes.textoDescricao}
                                >
                                  {item}
                                </Typography>
                              </Collapse>
                            </Grid>
                          ))}
                      </Grid>
                    </Paper>
                  </Box>
                ))}
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }
);
