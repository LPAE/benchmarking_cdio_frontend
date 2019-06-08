import React from 'react';
import api from '../../Services/api';

import AreaForm from '../Components/AreaForm';
import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';

export default class ConfigTurma extends React.Component {
  state = {
    curso: 'None',
    projeto: 'None',
    semestre: '19-1',

    concepcaoState: {},
    designState: {},
    implementacaoState: {},
    operacaoState: {}
  };

  buttonClick = async e => {
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

    if( Object.keys(areas).length !== 0 ){
      const turma = {
        curso: this.state.curso,
        projeto: this.state.projeto,
        semestre: this.state.semestre,
        expectativa: { ...areas }
      };
      await api.post('/turma', turma);
      this.props.history.push(`/turma/${this.state.curso}/${this.state.projeto}/${this.state.semestre}`);
    } else {
      alert('Preencha Todos os Itens de Pelo Menos Uma Área');
    }

    
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

          {/* TODO: DEIXAR DATA DINÂMICA */}
          <p>Semestre:</p>
          <select name="semestre" value={this.state.semestre} onChange={e => this.setState({ semestre: e.target.value })}>
            <option value="18-2">18/2</option>
            <option value="19-1">19/1</option>
            <option value="19-2">19/2</option>
            <option value="20-1">20/1</option>
          </select>

          <AreaForm area={areaConcepcao} onChange={this.handleAreaChange} state="concepcaoState" mostrarDescricao="1"/>

          <button type="submit" onClick={this.buttonClick}>
            Confirmar
          </button>
        </form>
      </div>
    );
  }
}
