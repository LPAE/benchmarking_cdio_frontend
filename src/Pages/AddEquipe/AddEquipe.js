import React from 'react';

import './AddEquipe.sass';
import api from '../../Services/api';

import AreasForm from '../Components/AreasForm';

export default class AddEquipe extends React.Component {
  state = {
    nomeDaEquipe: ''
  };

  submitAreasFormCallback = async turmas => {
    console.log('a')
  };

  render() {
    return (
      <div className="AddEquipe">
        <header>
          <div className="VoltarButton">
            <button onClick={e => this.props.history.go(-1)}>Voltar</button>
          </div>
          <h1 className="Titulo">Adicionar Equipe</h1>
        </header>

        <div className="AddEquipeForm">
          <AreasForm callback={this.submitAreasFormCallback} mostrarDescricao="1">
            <span className="">Nome da Equipe:</span>
            <input type="text" value={this.state.nomeDaEquipe} onChange={e => this.setState({ nomeDaEquipe: e.target.value })} />
          </AreasForm>
        </div>
      </div>
    );
  }
}
