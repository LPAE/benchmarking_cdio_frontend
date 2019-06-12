import React from 'react';

import './AddEquipe.sass';
import api from '../../Services/api';

import AreasForm from '../Components/AreasForm';

export default class AddEquipe extends React.Component {
  state = {
    nomeDaEquipe: ''
  };

  submitAreasFormCallback = async areas => {
    if (this.state.nomeDaEquipe !== '') {
      const dataToSend = {
        curso: this.props.match.params.curso,
        projeto: this.props.match.params.projeto,
        semestre: this.props.match.params.semestre,
        equipe: { nome: this.state.nomeDaEquipe, area: { ...areas } }
      };
      await api.post('/turma/equipe', dataToSend, err => {
        if (err) console.log('Erro ao mandar nova Equipe');
      });
      this.props.history.push(
        `/turma/${this.props.match.params.curso}/${this.props.match.params.projeto}/${this.props.match.params.semestre}`
      );
    } else {
      alert('Preencha o Nome da Equipe')
    }
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
          <AreasForm callback={this.submitAreasFormCallback} mostrarDescricao={true} >
            <span className="">Nome da Equipe:</span>
            <input type="text" value={this.state.nomeDaEquipe} onChange={e => this.setState({ nomeDaEquipe: e.target.value })} />
          </AreasForm>
        </div>
      </div>
    );
  }
}
