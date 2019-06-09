import React from 'react';

import './AddEquipe.sass';
import api from '../../Services/api';

import AreaForm from '../Components/AreaForm';

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
      [state]: { ...this.state[state], [name.split('_')[1]]: value }
    });
  };

  handleNomeDaEquipeChange = e => {};

  buttonSubmit = async e => {
    e.preventDefault();

    let areas = {};
    if (Object.keys(this.state.concepcaoState).length === areaConcepcao.item.length) {
      areas = { ...areas, concepcao: this.state.concepcaoState };
    }
    if (Object.keys(this.state.designState).length === areaDesign.item.length) {
      areas = { ...areas, design: this.state.designState };
    }
    if (Object.keys(this.state.implementacaoState).length === areaImplementacao.item.length) {
      areas = { ...areas, implementacao: this.state.implementacaoState };
    }
    if (Object.keys(this.state.operacaoState).length === areaOperacao.item.length) {
      areas = { ...areas, operacao: this.state.operacaoState };
    }

    if (Object.keys(areas).length !== 0) {
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
      alert('Preencha todos os itens de pelo menos uma Área');
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
          <span className="">Nome da Equipe:</span>
          <input type="text" value={this.state.nomeDaEquipe} onChange={e => this.setState({ nomeDaEquipe: e.target.value })} />

          <AreaForm area={areaConcepcao} onChange={this.handleAreaChange} state="concepcaoState" mostrarDescricao="1" />
          <AreaForm area={areaDesign} onChange={this.handleAreaChange} state="designState" mostrarDescricao="1" />
        </div>

        <button onClick={this.buttonSubmit}>Confirmar</button>
      </div>
    );
  }
}
