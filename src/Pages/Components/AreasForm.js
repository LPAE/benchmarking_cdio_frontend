import React from 'react';
import AreaForm from './AreaForm';
import { Grid, Button } from '@material-ui/core';

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';

// TODO: TIRAR ALERT() E COLOCAR DIALOG
// TODO: LIMITAR TAMANHO MÁXIMO DO FORM

export default class AreasForm extends React.Component {
  state = { concepcaoState: {}, designState: {}, implementacaoState: {}, operacaoState: {} };
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
      alert('Preencha todos os itens de pelo menos uma Área');
    }
  };

  handleAreaChange = (state, e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [state]: { ...this.state[state], [name.split('_')[1]]: value }
    });
  };

  render() {
    return (
      <Grid container direction="column" alignItems="center" className="AreasForm">
        {this.props.children}

        {!this.props.hideConcepcao && (
          <AreaForm
            area={areaConcepcao}
            onChange={this.handleAreaChange}
            state={this.state.concepcaoState}
            stateName="concepcaoState"
            mostrarDescricao={this.props.mostrarDescricao}
          />
        )}

        {!this.props.hideDesign && (
          <AreaForm
            area={areaDesign}
            onChange={this.handleAreaChange}
            state={this.state.designState}
            stateName="designState"
            mostrarDescricao={this.props.mostrarDescricao}
          />
        )}
        {!this.props.hideImplementacao && (
          <AreaForm
            area={areaImplementacao}
            onChange={this.handleAreaChange}
            state={this.state.implementacaoState}
            stateName="implementacaoState"
            mostrarDescricao={this.props.mostrarDescricao}
          />
        )}
        {!this.props.hideOperacao && (
          <AreaForm
            area={areaOperacao}
            onChange={this.handleAreaChange}
            state={this.state.operacaoState}
            stateName="operacaoState"
            mostrarDescricao={this.props.mostrarDescricao}
          />
        )}

        <Button color="secondary" variant="contained" onClick={this.buttonSubmit}>
          Confirmar
        </Button>
      </Grid>
    );
  }
}
