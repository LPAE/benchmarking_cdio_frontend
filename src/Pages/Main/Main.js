import React from 'react';
import './Main.sass';

const IdForm = (props) => (
      <div className='IdForm'>
        <form onSubmit={props.onSubmit}>
          <p>{props.text}:</p>
          <input type='text' value={props.textValue} onChange={props.textOnChange}></input>
          <input type='submit' value={props.buttonText}></input>
        </form>
      </div>
)

export default class Main extends React.Component {
  state = {
    criarValue: '',
    acessarValue: '',
  }

  criarTurma = (e) => {
    e.preventDefault();
    console.log('asd')
  }

  acessarTurma = (e) => {
    e.preventDefault();
    console.log('asd')
  }

  handleCriarInputChange = (e) => {
    this.setState({ criarValue: e.target.value })
  }

  handleAcessarInputChange = (e) => {
    this.setState({ acessarValue: e.target.value })
  }

  render () {
    return (
    <div className='Main'>

      <div className='MainHeader'>
        <h1>Benchmarking CDIO</h1>
      </div>
      
      <div className='IdForms'>
        <IdForm 
          text='Criar Turma' 
          buttonText='Criar' 
          onSubmit={this.criarTurma} 
          textValue={this.state.criarValue} 
          textOnChange={this.handleCriarInputChange}/>

        <IdForm 
          text='Acessar Turma' 
          buttonText='Acessar' 
          onSubmit={this.acessarTurma} 
          textValue={this.state.acessarValue} 
          textOnChange={this.handleAcessarInputChange}/>
      </div>
        
    </div>
    )
  }
}
