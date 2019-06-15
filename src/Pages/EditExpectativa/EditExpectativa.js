import React from 'react';
import api from '../../Services/api';
import AreasForm from '../Components/AreasForm';
import TopBar from '../Components/TopBar';

export default class EditExpectativa extends React.Component {
  state = {
    turma: {},

    concepcao: {},
    design: {},
    implementacao: {},
    operacao: {},

    finishedSetState: false
  };

  async componentDidMount() {
    const curso = this.props.match.params.curso;
    const projeto = this.props.match.params.projeto;
    const semestre = this.props.match.params.semestre;
    const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);

    if (Object.keys(turma.data.expectativa).includes('concepcao'))
      this.setState({ ...this.state, concepcao: turma.data.expectativa.concepcao });
    if (Object.keys(turma.data.expectativa).includes('design')) this.setState({ ...this.state, design: turma.data.expectativa.design });
    if (Object.keys(turma.data.expectativa).includes('implementacao'))
      this.setState({ ...this.state, implementacao: turma.data.expectativa.implementacao });
    if (Object.keys(turma.data.expectativa).includes('operacao'))
      this.setState({ ...this.state, operacao: turma.data.expectativa.operacao });

    this.setState({ ...this.state, turma: turma.data, finishedSetState: true });
  }

  submitAreasFormCallback = async areas => {
    const dataToSend = {
      curso: this.props.match.params.curso,
      projeto: this.props.match.params.projeto,
      semestre: this.props.match.params.semestre,
      expectativa: { ...areas }
    };
    console.log(dataToSend);
    await api.post('/turma/equipe/expectativa', dataToSend);
    this.props.history.push(
      `/turma/${this.props.match.params.curso}/${this.props.match.params.projeto}/${this.props.match.params.semestre}`
    );
  };

  render() {
    return (
      <div className="EditExpectativa">
        <TopBar voltar title="Editar Expectativa" {...this.props} />
        {this.state.finishedSetState && (
          <AreasForm
            callback={this.submitAreasFormCallback}
            mostrarDescricao={false}
            concepcao={this.state.concepcao}
            design={this.state.design}
            implementacao={this.state.implementacao}
            operacao={this.state.operacao}
          />
        )}
      </div>
    );
  }
}
