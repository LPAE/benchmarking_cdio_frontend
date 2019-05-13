import React from 'react';
import './Main.sass';

const IdForm = (props) => (
      <div className='IdForm'>
        <form>
          <p>{props.text}:</p>
          <input type='text'></input>
          <input type="submit" value={props.button}></input>
        </form>
      </div>
)

export default class Main extends React.Component {
  render () {
    return (
    <div className='Main'>

      <div className='MainHeader'>
        <h1>Benchmarking CDIO</h1>
      </div>

      <IdForm text='Criar Turma' button='Criar'/>
      
    </div>
    )
  }
}
