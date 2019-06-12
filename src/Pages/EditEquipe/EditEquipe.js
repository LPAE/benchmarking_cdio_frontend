import React from 'react';
import api from '../../Services/api';
import AreasForm from '../Components/AreasForm';

export default class EditEquipe extends React.Component {
  state = {
    turma: {},
    equipeIndex: 0,
    hideConcepcao: false,
    hideDesign: false,
    hideImplementacao: false,
    hideOperacao: false
  };

  async componentDidMount() {
    const curso = this.props.match.params.curso;
    const projeto = this.props.match.params.projeto;
    const semestre = this.props.match.params.semestre;
    const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);
    const equipeIndex = turma.data.equipes.findIndex(equipe => equipe.nome === `${this.props.match.params.equipe}`);
    this.setState({ turma: turma.data, equipeIndex });

    if (Object.keys(turma.data.equipes[equipeIndex].area).includes('concepcao')) this.setState({ ...this.state, hideConcepcao: true });
    if (Object.keys(turma.data.equipes[equipeIndex].area).includes('design')) this.setState({ ...this.state, hideDesign: true });
    if (Object.keys(turma.data.equipes[equipeIndex].area).includes('implementacao'))
      this.setState({ ...this.state, hideImplementacao: true });
    if (Object.keys(turma.data.equipes[equipeIndex].area).includes('operacao')) this.setState({ ...this.state, hideOperacao: true });
  }

  submitAreasFormCallback = async areas => {
    const dataToSend = {
      curso: this.props.match.params.curso,
      projeto: this.props.match.params.projeto,
      semestre: this.props.match.params.semestre,
      equipe: { nome: this.state.turma.equipes[this.state.equipeIndex].nome, area: { ...areas } }
    };
    await api.post('/turma/equipe/area', dataToSend);
    this.props.history.push(
      `/turma/${this.props.match.params.curso}/${this.props.match.params.projeto}/${this.props.match.params.semestre}`
    );
  };

  render() {
    return (
      <div className="EditExpectativa">
        <div className="VoltarButton">
          <button onClick={e => this.props.history.go(-1)}>Voltar</button>
        </div>
        <AreasForm
          callback={this.submitAreasFormCallback}
          mostrarDescricao={true}
          hideConcepcao={this.state.hideConcepcao}
          hideDesign={this.state.hideDesign}
          hideImplementacao={this.state.hideImplementacao}
          hideOperacao={this.state.hideOperacao}
        >
          {this.state.turma.equipes && <span className="">Nome da Equipe: {this.state.turma.equipes[this.state.equipeIndex].nome}</span>}
        </AreasForm>
      </div>
    );
  }
}
