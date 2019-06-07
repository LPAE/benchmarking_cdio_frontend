import React from 'react';

import AreaForm from '../Components/AreaForm';

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';

export default class ConfigTurma extends React.Component {
  state = {
    projeto: 'None',
    numero: 0,
    curso: 'None',
    semestre: '19/1',

    concepcaoState: {},
    designState: {},
    implementacaoState: {},
    operacaoState: {}
  };

  handleAreaChange = (state, e) => {
    const { name, value } = e.target;

    this.setState({
      [state]: { ...this.state[state], [name]: value }
    });
  };

  render() {
    return (
      <div className="ConfigTurma">
        <form>
          <p>Projeto:</p>
          <select name="projeto" value={this.state.projeto} onChange={e => this.setState({ projeto: e.target.value })}>
            <option disabled value="None">
              {' -- Escolha uma Opção -- '}
            </option>
            <option value="Projeto Integrador">Projeto Integrador</option>
            <option value="Trabalho de Conclusão de Curso">Trabalho de Conclusão de Curso</option>
            <option value="Outro">Outro</option>
          </select>

          {this.state.projeto === 'Projeto Integrador' && (
            <>
              <p>Número:</p>
              <select name="numero">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </>
          )}

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

          {/* TODO: DEIXAR DATA DINÂMICA */}
          <p>Semestre:</p>
          <select name="semestre">
            <option value="18-2">18/2</option>
            <option value="19-1">19/1</option>
            <option value="19-2">19/2</option>
            <option value="20-1">20/1</option>
          </select>

          <AreaForm area={areaConcepcao} onChange={this.handleAreaChange} state="concepcaoState" />

          <button type="submit">Confirmar</button>
        </form>
      </div>
    );
  }
}
