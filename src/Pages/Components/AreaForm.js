import React from 'react';

export default class AreaForm extends React.Component {
  state = {
    actualIndex: 0
  };

  radioCallback = e => {
    {
      this.state.actualIndex < this.props.area.item.length &&
        e.target.name === this.props.area.item[this.state.actualIndex].indicador &&
        this.setState({ actualIndex: this.state.actualIndex + 1 });
    }

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
                    <td>{item.indicador}:</td>
                    <td>
                      <input type="radio" name={item.indicador} value="1" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={item.indicador} value="2" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={item.indicador} value="3" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={item.indicador} value="4" onChange={this.radioCallback} />
                    </td>
                    <td>
                      <input type="radio" name={item.indicador} value="5" onChange={this.radioCallback} />
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
