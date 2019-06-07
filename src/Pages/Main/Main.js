import React from 'react';
import api from '../../Services/api';

import './Main.sass';

const AccessButton = props => (
  <div className="accessButton">
    <button onClick={props.onClick} type="text">{props.text}</button>
  </div>
);

export default class Main extends React.Component {

  acessarFerramenta = e => {
    e.preventDefault();
    this.props.history.push(`/access`);
  };

  preencherFerramenta = async e => {
    e.preventDefault();
    this.props.history.push(`/config`);
  };


  render() {
    return (
      <div className="Main">
        <div className="MainHeader">
          <h1>Benchmarking CDIO</h1>
        </div>

        <div className="Buttons">
          <AccessButton text="Acessar Ferramenta" onClick={this.acessarFerramenta} />
          <AccessButton text="Preencher Ferramenta" onClick={this.preencherFerramenta} />
        </div>
      </div>
    );
  }
}
