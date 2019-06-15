import React from 'react';
import Popup from 'reactjs-popup';
import { Grid, Box, Typography, Paper, Radio, TableCell, TableBody, TableRow, Table, TableHead } from '@material-ui/core';

const PopupIndicador = props => (
  <Popup trigger={<button>{props.indicador}</button>} position="right center" on="hover">
    <div>{props.textoIndicador}</div>
  </Popup>
);

const RadioGroup = props => (
  <>
    {['1', '2', '3', '4', '5'].map(numero => (
      <TableCell align="center" key={numero}>
        <Radio name={props.name} checked={props.checked === numero} value={numero} onChange={props.onChange} />
      </TableCell>
    ))}
  </>
);

export default class AreaForm extends React.Component {
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
    return (
      <Grid container alignContent="center" className="AreaForm">
        <Grid item>
          <Typography justify="center" variant="h3">
            Área: {this.props.area.titulo}
          </Typography>
        </Grid>
        <Grid item>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['', '1', '2', '3', '4', '5'].map(item => (
                  <TableCell key={item} align="center">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.area.item &&
                this.props.area.item.map((item, index) => (
                  <>
                    <TableRow key={item.indicador}>
                      <TableCell align="center">
                        <PopupIndicador indicador={item.indicador} textoIndicador={item.textoIndicador} />:
                      </TableCell>
                      <RadioGroup
                        name={`${this.props.stateName}_${item.indicador}`}
                        checked={this.props.state[item.indicador]}
                        onChange={this.radioCallback}
                      />
                    </TableRow>
                    {this.props.mostrarDescricao && index === this.state.actualIndex && (
                      <TableRow>
                        {['', item.descricao1, '', item.descricao2, '', item.descricao3].map(item => (
                          <TableCell key={item} align="center">
                            <Typography variant="body2">
                              {item}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}
