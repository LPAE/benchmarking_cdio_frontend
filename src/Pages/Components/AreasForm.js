import React from 'react';
import AreaForm from './AreaForm';
import { Grid, Button, withStyles } from '@material-ui/core';

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';
import Alert from './Alert';

const styles = theme => ({
  root: {
    'max-width': '1200px', // tamanho fixo para telas grandes
    margin: 'auto'
  }
});

export default withStyles(styles)(
  class AreasForm extends React.Component {
    state = {
      concepcaoState: {},
      designState: {},
      implementacaoState: {},
      operacaoState: {},
      concepcaoMetrica: {},
      designMetrica: {},
      implementacaoMetrica: {},
      operacaoMetrica: {},
      alert: false
    };
    componentDidMount() {
      var state = this.state;
      if (this.props.concepcao) {
        state.concepcaoState = this.props.concepcao;
      } else {
        areaConcepcao.item.map(item => (state.concepcaoState[item.indicador] = '0'));
      }
      if (this.props.design) {
        state.designState = this.props.design;
      } else {
        areaDesign.item.map(item => (state.designState[item.indicador] = '0'));
      }
      if (this.props.implementacao) {
        state.implementacaoState = this.props.implementacao;
      } else {
        areaImplementacao.item.map(item => (state.implementacaoState[item.indicador] = '0'));
      }
      if (this.props.operacao) {
        state.operacaoState = this.props.operacao;
      } else {
        areaOperacao.item.map(item => (state.operacaoState[item.indicador] = '0'));
      }

      if (this.props.concepcaoMetrica) {
        state.concepcaoMetrica = this.props.concepcaoMetrica;
      }
      if (this.props.designMetrica) {
        state.designMetrica = this.props.designMetrica;
      }
      if (this.props.implementacaoMetrica) {
        state.implementacaoMetrica = this.props.implementacaoMetrica;
      }
      if (this.props.operacaoMetrica) {
        state.operacaoMetrica = this.props.operacaoMetrica;
      }

      this.setState({ ...state });
    }

    areaIsComplete = area => {
      return !Object.values(area).includes('0');
    };

    fillArea = () => {
      var areas = {};
      if (this.areaIsComplete(this.state.concepcaoState)) {
        areas = { ...areas, concepcao: this.state.concepcaoState };
      }
      if (this.areaIsComplete(this.state.designState)) {
        areas = { ...areas, design: this.state.designState };
      }
      if (this.areaIsComplete(this.state.implementacaoState)) {
        areas = { ...areas, implementacao: this.state.implementacaoState };
      }
      if (this.areaIsComplete(this.state.operacaoState)) {
        areas = { ...areas, operacao: this.state.operacaoState };
      }
      return areas;
    };

    buttonSubmit = async e => {
      e.preventDefault();
      const areas = this.fillArea();
      if (Object.keys(areas).length !== 0) {
        this.props.callback(areas);
      } else {
        this.setState({ alert: true });
      }
    };

    handleAreaChange = (stateName, e) => {
      const { name, value } = e.target;
      this.setState({
        [stateName]: { ...this.state[stateName], [name.split('_')[1]]: value }
      });
      console.log(this.state)
    };

    render() {
      const { classes } = this.props;
      return (
        <Grid container direction="column" alignItems="center" className={classes.root}>
          {this.props.children}

          {!this.props.hideConcepcao && (
            <AreaForm
              area={areaConcepcao}
              onChange={this.handleAreaChange}
              state={this.state.concepcaoState}
              stateName="concepcaoState"
              stateMetrica={this.state.concepcaoMetrica}
              stateNameMetrica="concepcaoMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
            />
          )}

          {!this.props.hideDesign && (
            <AreaForm
              area={areaDesign}
              onChange={this.handleAreaChange}
              state={this.state.designState}
              stateName="designState"
              stateMetrica={this.state.designMetrica}
              stateNameMetrica="designMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
            />
          )}
          {!this.props.hideImplementacao && (
            <AreaForm
              area={areaImplementacao}
              onChange={this.handleAreaChange}
              state={this.state.implementacaoState}
              stateName="implementacaoState"
              stateMetrica={this.state.implementacaoMetrica}
              stateNameMetrica="implementacaoMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
            />
          )}
          {!this.props.hideOperacao && (
            <AreaForm
              area={areaOperacao}
              onChange={this.handleAreaChange}
              state={this.state.operacaoState}
              stateName="operacaoState"
              stateMetrica={this.state.operacaoMetrica}
              stateNameMetrica="operacaoMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
            />
          )}

          <Button color="secondary" variant="contained" onClick={this.buttonSubmit}>
            Confirmar
          </Button>
          <Alert
            text="Preencha todos os itens de pelo menos uma Área"
            open={this.state.alert}
            handleClose={e => this.setState({ alert: false })}
          />
        </Grid>
      );
    }
  }
);
