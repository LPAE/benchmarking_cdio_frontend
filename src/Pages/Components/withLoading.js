import React from 'react';
import api from '../../Services/api';

const Loading = () => <h1>Loading</h1>;

export function withLoadingTurma(Component) {
  return class extends React.Component {
    state = {
      turma: null
    };

    async componentDidMount() {
      const curso = this.props.match.params.curso;
      const projeto = this.props.match.params.projeto;
      const semestre = this.props.match.params.semestre;
      const turma = await api.get(`/turma/${curso}/${projeto}/${semestre}`);
      this.setState({ turma: turma.data });
    }

    render() {
      if (this.state.turma !== null) return <Component turma={this.state.turma} {...this.props} />;
      else return <Loading />;
    }
  };
}

export function withLoadingTurmas(Component) {
  return class extends React.Component {
    state = {
      turmas: null
    };

    async componentDidMount() {
      const turmas = await api.get(`/turma`);
      this.setState({ turmas: turmas.data });
    }

    render() {
      if (this.state.turmas !== null) return <Component turmas={this.state.turmas} {...this.props} />;
      else return <Loading />;
    }
  };
}
