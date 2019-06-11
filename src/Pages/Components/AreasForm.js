import React from 'react';
import AreaForm from './AreaForm';

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';

export default class AreasForm extends React.Component {
  state = { concepcaoState: {}, designState: {}, implementacaoState: {}, operacaoState: {} };
  componentDidMount() {
    var state = this.state;
    areaConcepcao.item.map(item => (state.concepcaoState[item.indicador] = '0'));
    areaDesign.item.map(item => (state.designState[item.indicador] = '0'));
    areaImplementacao.item.map(item => (state.implementacaoState[item.indicador] = '0'));
    areaOperacao.item.map(item => (state.operacaoState[item.indicador] = '0'));
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
      <div className="AreasForm">
        {this.props.children}

        <AreaForm
          area={areaConcepcao}
          onChange={this.handleAreaChange}
          state={this.state.concepcaoState}
          stateName="concepcaoState"
          mostrarDescricao={this.props.mostrarDescricao}
        />
        <AreaForm
          area={areaDesign}
          onChange={this.handleAreaChange}
          state={this.state.designState}
          stateName="designState"
          mostrarDescricao={this.props.mostrarDescricao}
        />
        <AreaForm
          area={areaImplementacao}
          onChange={this.handleAreaChange}
          state={this.state.implementacaoState}
          stateName="implementacaoState"
          mostrarDescricao={this.props.mostrarDescricao}
        />
        <AreaForm
          area={areaOperacao}
          onChange={this.handleAreaChange}
          state={this.state.operacaoState}
          stateName="operacaoState"
          mostrarDescricao={this.props.mostrarDescricao}
        />

        <button type="submit" onClick={this.buttonSubmit}>
          Confirmar
        </button>
      </div>
    );
  }
}
