import React from 'react';
import Popup from 'reactjs-popup';
import { Grid, Box, Typography, Radio, Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {},
  textoDescricao: {
    fontSize: '0.65rem'
  }
};

const PopupIndicador = props => (
  <Popup trigger={<button>{props.indicador}</button>} position="right center" on="hover">
    <div>{props.textoIndicador}</div>
  </Popup>
);

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
      clicked: []
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
            {['Indicador', '1', '2', '3', '4', '5'].map(item => (
              <Grid item xs={2} key={item}>
                <Typography align="center" variant="h6">
                  {item}
                </Typography>
              </Grid>
            ))}

            <Grid container justify="center" alignItems="center">
              {this.props.area.item &&
                this.props.area.item.map((item, index) => (
                  <>
                    <Grid container justify="center" alignItems="center" key={item.indicador}>
                      <Grid item xs={2} key={item} justify="center">
                        <PopupIndicador indicador={item.indicador} textoIndicador={item.textoIndicador} />
                      </Grid>
                      <RadioGroup
                        name={`${this.props.stateName}_${item.indicador}`}
                        checked={this.props.state[item.indicador]}
                        onChange={this.radioCallback}
                      />
                    </Grid>

                    <Grid container spacing={2} justify="center" alignItems="flex-start">
                      {this.props.mostrarDescricao &&
                        ['', item.descricao1, item.descricao2, item.descricao3].map((item, i) => (
                          <Grid item xs={12} md={i === 0 ? 2 : i === 1 || i === 3 ? 3 : 4} key={i} alignItems="center">
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
                  </>
                ))}
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }
);
