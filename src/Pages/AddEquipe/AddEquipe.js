import React from 'react';

import './AddEquipe.sass';
import api from '../../Services/api';

import AreaForm from '../Components/AreaForm'

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';



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

  buttonVoltar = e => {
    this.props.history.go(-1);
  };

  render() {
    return (
      <div className="AddEquipe">
        <div className="AddEquipeHeader">
          <div className="VoltarButton">
            <button onClick={this.buttonVoltar}>Voltar</button>
          </div>
          <div className="Titulo">Adicionar Equipe</div>
        </div>

        <div className="AddEquipeForm">
          <span className="">Nome da Equipe:</span>
          <input type="text" value={this.state.nomeDaEquipe} onChange={this.handleNomeDaEquipeChange} />

          <AreaForm area={areaConcepcao} onChange={this.handleAreaChange} state="concepcaoState" />
          <AreaForm area={areaDesign} onChange={this.handleAreaChange} state="designState" />
        </div>

        <button onClick={this.buttonClickTest}>test</button>
      </div>
    );
  }
}
