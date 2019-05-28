import React from 'react';

import './AddEquipe.sass';
import api from '../../Services/api';

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';

const Area = props => (
  <div className="Area">
    <span className="AreaTitle">Área: {props.area.titulo}</span>
    <form action="submit">
      {props.area.item &&
        props.area.item.map(item => (
          <div key={item.indicador}>
            {item.indicador}:
            <input
              type="radio"
              name={item.indicador}
              value="1"
              onChange={e => props.onChange(props.state, e)}
            />
            <input
              type="radio"
              name={item.indicador}
              value="2"
              onChange={e => props.onChange(props.state, e)}
            />
            <input
              type="radio"
              name={item.indicador}
              value="3"
              onChange={e => props.onChange(props.state, e)}
            />
            <input
              type="radio"
              name={item.indicador}
              value="4"
              onChange={e => props.onChange(props.state, e)}
            />
            <input
              type="radio"
              name={item.indicador}
              value="5"
              onChange={e => props.onChange(props.state, e)}
            />
          </div>
        ))}
    </form>
    <div className="AreaForm" />
  </div>
);

export default class AddEquipe extends React.Component {
  state = {
    nomeDaEquipe: '',
    concepcaoState: {},
    designState: {},
    implementacaoState: {},
    operacaoState: {}
  };

  async componentDidMount() {}

  handleAreaChange = (state, e) => {
    const { name, value } = e.target;

    this.setState({
      [state]: { ...this.state[state], [name]: value }
    });
  };

  handleNomeDaEquipeChange = e => {
    this.setState({
      nomeDaEquipe: e.target.value
    });
  };

  buttonClickTest = async e => {
    console.log(`/id/equipe/${this.props.match.params.id}`);
    const dataToSend = {
      nome: this.nomeDaEquipe,
      concepcao: this.state.concepcaoState,
      design: this.state.designState,
      implementacao: this.state.implementacaoState,
      operacao: this.state.operacaoState
    };
    api.post(`/id/equipe/${this.props.match.params.id}`, dataToSend, err => {
      if (err) console.log('Erro ao mandar nova Equipe');
    });
  };

  render() {
    return (
      <div className="AddEquipe">
        <div className="AddEquipeHeader">
          <div className="VoltarButton">
            <button>Voltar</button>
          </div>
          <div className="Titulo">Adicionar Equipe</div>
        </div>

        <div className="AddEquipeForm">
          <span className="">Nome da Equipe:</span>
          <input
            type="text"
            value={this.state.nomeDaEquipe}
            onChange={this.handleNomeDaEquipeChange}
          />

          <Area area={areaConcepcao} onChange={this.handleAreaChange} state="concepcaoState" />
          <Area area={areaDesign} onChange={this.handleAreaChange} state="designState" />
        </div>

        <button onClick={this.buttonClickTest}>test</button>
      </div>
    );
  }
}
