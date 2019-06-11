import React from 'react';
import AreaForm from './AreaForm';

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';

export default class AreasForm extends React.Component {
  componentDidMount() {
    this.state = {
      concepcaoState: {},
      designState: {},
      implementacaoState: {},
      operacaoState: {}
    };
    areaConcepcao.item.map(item => {
      this.state.concepcaoState[item.indicador] = '0';
    });
    areaDesign.item.map(item => {
      this.state.designState[item.indicador] = '0';
    });
    areaImplementacao.item.map(item => {
      this.state.implementacaoState[item.indicador] = '0';
    });
    areaOperacao.item.map(item => {
      this.state.operacaoState[item.indicador] = '0';
    });
    console.log(this.state);
  }

  areaIsComplete = area => {
    const values = Object.values(area);
    return !values.includes('0');
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
          state="concepcaoState"
          mostrarDescricao={this.props.mostrarDescricao}
        />
        <AreaForm area={areaDesign} onChange={this.handleAreaChange} state="designState" mostrarDescricao={this.props.mostrarDescricao} />
        <AreaForm
          area={areaImplementacao}
          onChange={this.handleAreaChange}
          state="implementacaoState"
          mostrarDescricao={this.props.mostrarDescricao}
        />
        <AreaForm
          area={areaOperacao}
          onChange={this.handleAreaChange}
          state="operacaoState"
          mostrarDescricao={this.props.mostrarDescricao}
        />

        <button type="submit" onClick={this.buttonSubmit}>
          Confirmar
        </button>
      </div>
    );
  }
}
