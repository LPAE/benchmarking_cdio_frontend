import React from 'react';
import ReactDOM from 'react-dom';
import './Main.css';

const MainForm = (props) => (
      <div className='MainForm'>
        <form>
          <p>{props.text}:</p>
          <input type='text' name='name'></input>
          <input type="submit" value={props.button}></input>
        </form>
      </div>
)

export default class Main extends React.Component {
  render () {
    return (
    <div className='Main'>
      <MainForm text='Criar Turma' button='Criar'/>
    </div>
    )
  }
}
