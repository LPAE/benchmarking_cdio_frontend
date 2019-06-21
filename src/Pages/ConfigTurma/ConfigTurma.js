import React from 'react';
import api from '../../Services/api';
import AreasForm from '../Components/AreasForm';

import { Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import TopBar from '../Components/TopBar';
import cursos from '../Cursos';

export default class ConfigTurma extends React.Component {
  state = {
    curso: '',
    projeto: '',
    semestre: '19-1'
  };

  submitAreasFormCallback = async areas => {
    if (this.state.curso !== '' && this.state.curso !== '') {
      const turma = {
        curso: this.state.curso,
        projeto: this.state.projeto,
        semestre: this.state.semestre,
        expectativa: { ...areas }
      };
      await api.post('/turma', turma);
      this.props.history.push(`/turma/${this.state.curso}/${this.state.projeto}/${this.state.semestre}`);
    } else {
      alert('Preencha todos os campos primeiro');
    }
  };

  // TODO: TENTAR DEIXAR DATA DINÂMICA

  render() {
    return (
      <div className="ConfigTurma">
        <TopBar voltar title="Configurar Turma" {...this.props} />
        <form>
          <AreasForm callback={this.submitAreasFormCallback}>
            <Grid item>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel>Curso</InputLabel>
                <Select name="curso" value={this.state.curso} onChange={e => this.setState({ curso: e.target.value })}>
                  {cursos &&
                    Object.keys(cursos).map(curso => (
                      <MenuItem key={curso} value={curso}>
                        {curso}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel>Projeto</InputLabel>
                <Select name="projeto" value={this.state.projeto} onChange={e => this.setState({ projeto: e.target.value })}>
                  {cursos[this.state.curso] ? (
                    cursos[this.state.curso].map(projeto => (
                      <MenuItem key={projeto} value={projeto}>
                        {projeto}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      Escolha um Curso Primeiro
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl style={{ minWidth: 130 }}>
                <InputLabel>Semestre</InputLabel>
                <Select name="semestre" value={this.state.semestre} onChange={e => this.setState({ semestre: e.target.value })}>
                  <MenuItem value="18-2">18/2</MenuItem>
                  <MenuItem value="19-1">19/1</MenuItem>
                  <MenuItem value="19-2">19/2</MenuItem>
                  <MenuItem value="20-1">20/1</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </AreasForm>
        </form>
      </div>
    );
  }
}
