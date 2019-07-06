import React from 'react';
import api from '../../Services/api';
import AreasForm from '../Components/AreasForm';
import TopBar from '../Components/TopBar';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    background: theme.palette.lightPrimary.main,
    minHeight: '100vh'
  }
});

export default withStyles(styles)(
  class EditExpectativa extends React.Component {
    state = {
      turma: {},

      concepcao: {},
      design: {},
      implementacao: {},
      operacao: {},

      concepcaoMetrica: {},
      designMetrica: {},
      implementacaoMetrica: {},
      operacaoMetrica: {},

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

      if (Object.keys(turma.data.metrica).includes('concepcao'))
        this.setState({ ...this.state, concepcaoMetrica: turma.data.metrica.concepcao });
      if (Object.keys(turma.data.metrica).includes('design')) this.setState({ ...this.state, designMetrica: turma.data.metrica.design });
      if (Object.keys(turma.data.metrica).includes('implementacao'))
        this.setState({ ...this.state, implementacaoMetrica: turma.data.metrica.implementacao });
      if (Object.keys(turma.data.metrica).includes('operacao'))
        this.setState({ ...this.state, operacaoMetrica: turma.data.metrica.operacao });

      this.setState({ ...this.state, turma: turma.data, finishedSetState: true });
    }

    submitAreasFormCallback = async (areas, metricas) => {
      const dataToSend = {
        curso: this.props.match.params.curso,
        projeto: this.props.match.params.projeto,
        semestre: this.props.match.params.semestre,
        expectativa: { ...areas },
        metrica: { ...metricas }
      };
      console.log(dataToSend);
      await api.post('/turma/config', dataToSend);
      this.props.history.push(
        `/turma/${this.props.match.params.curso}/${this.props.match.params.projeto}/${this.props.match.params.semestre}`
      );
    };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <TopBar voltar title="Editar Expectativa" history={this.props.history} />
          {this.state.finishedSetState && (
            <AreasForm
              callback={this.submitAreasFormCallback}
              concepcao={this.state.concepcao}
              design={this.state.design}
              implementacao={this.state.implementacao}
              operacao={this.state.operacao}
              mostrarMetrica
              concepcaoMetrica={this.state.concepcaoMetrica}
              designMetrica={this.state.designMetrica}
              implementacaoMetrica={this.state.implementacaoMetrica}
              operacaoMetrica={this.state.operacaoMetrica}
            />
          )}
        </div>
      );
    }
  }
);
