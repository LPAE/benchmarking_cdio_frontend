import React from 'react';
import Popup from 'reactjs-popup';

const PopupIndicador = props => (
  <Popup trigger={<button>{props.indicador}</button>} position="right center" on="hover">
    <div>{props.textoIndicador}</div>
  </Popup>
);

export default class AreaForm extends React.Component {
  state = {
    actualIndex: 0,
    clicked: []
  };

  radioCallback = e => {
    const name = e.target.name.split('_')[1];
    var actualIndex = this.state.actualIndex;
    var clicked = this.state.clicked;

    if (actualIndex < this.props.area.item.length && name === this.props.area.item[actualIndex].indicador) {
      actualIndex++;
      while (actualIndex < this.props.area.item.length && clicked.includes(this.props.area.item[actualIndex].indicador)) {
        actualIndex++;
      }
    }

    clicked.push(name);
    this.setState({ ...this.state, actualIndex, clicked });
    this.props.onChange(this.props.state, e);
  };

  render() {
    return (
      <div className="AreaForm">
        <span className="AreaTitle">Área: {this.props.area.titulo}</span>
        <table>
          <tbody>
            <tr>
              <th />
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
            </tr>
            {this.props.area.item &&
              this.props.area.item.map((item, index) => (
                <>
                  <tr key={item.indicador}>
                    <td>
                      <PopupIndicador indicador={item.indicador} textoIndicador={item.textoIndicador} />:
                    </td>
                    <td>
                      <input type="radio" name={`${this.props.state}_${item.indicador}`} value="1" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={`${this.props.state}_${item.indicador}`} value="2" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={`${this.props.state}_${item.indicador}`} value="3" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={`${this.props.state}_${item.indicador}`} value="4" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={`${this.props.state}_${item.indicador}`} value="5" onChange={this.radioCallback} />
                    </td>
                  </tr>
                  {this.props.mostrarDescricao === '1' && index === this.state.actualIndex && (
                    <tr>
                      <td />
                      <td>{item.descricao1}</td>
                      <td />
                      <td>{item.descricao2}</td>
                      <td />
                      <td>{item.descricao3}</td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
