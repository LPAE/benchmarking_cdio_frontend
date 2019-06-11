import React from 'react';
import api from '../../Services/api';
import AreasForm from '../Components/AreasForm';

export default class ConfigTurma extends React.Component {
  state = {
    curso: 'None',
    projeto: 'None',
    semestre: '19-1'
  };

  submitAreasFormCallback = async areas => {
    if (this.state.curso !== 'None' && this.state.curso !== 'None') {
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
        <form>
          <AreasForm callback={this.submitAreasFormCallback} mostrarDescricao="0">
            <p>Curso:</p>
            <select name="curso" value={this.state.curso} onChange={e => this.setState({ curso: e.target.value })}>
              <option disabled value="None">
                {' -- Escolha uma Opção -- '}
              </option>
              <option value="Técnico">Técnico</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Engenharia">Engenharia</option>
              <option value="Especialização">Especialização</option>
            </select>

            <p>Projeto:</p>
            <select name="projeto" value={this.state.projeto} onChange={e => this.setState({ projeto: e.target.value })}>
              <option disabled value="None">
                {' -- Escolha uma Opção -- '}
              </option>
              <option value="Projeto Integrador 1">Projeto Integrador 1</option>
              <option value="Projeto Integrador 2">Projeto Integrador 2</option>
              {this.state.curso === 'Engenharia' && (
                <>
                  <option value="Projeto Integrador 3">Projeto Integrador 3</option>
                </>
              )}
              <option value="Trabalho de Conclusão de Curso">Trabalho de Conclusão de Curso</option>
              <option value="Outro">Outro</option>
            </select>

            <p>Semestre:</p>
            <select name="semestre" value={this.state.semestre} onChange={e => this.setState({ semestre: e.target.value })}>
              <option value="18-2">18/2</option>
              <option value="19-1">19/1</option>
              <option value="19-2">19/2</option>
              <option value="20-1">20/1</option>
            </select>
          </AreasForm>
        </form>
      </div>
    );
  }
}
