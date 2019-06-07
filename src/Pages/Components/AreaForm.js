import React from 'react';

export default class AreaForm extends React.Component {
  render() {
    return (
      <div className="AreaForm">
        <span className="AreaTitle">Área: {this.props.area.titulo}</span>
        <form action="submit">
          <table>
            <tr>
              <th></th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
            </tr>
            {this.props.area.item &&
              this.props.area.item.map(item => (
                <tr key={item.indicador}>
                  <td>{item.indicador}:</td>
                  <td>
                    <input type="radio" name={item.indicador} value="1" onChange={e => this.props.onChange(this.props.state, e)} />
                  </td>
                  <td>
                    <input type="radio" name={item.indicador} value="2" onChange={e => this.props.onChange(this.props.state, e)} />
                  </td>
                  <td>
                    <input type="radio" name={item.indicador} value="3" onChange={e => this.props.onChange(this.props.state, e)} />
                  </td>
                  <td>
                    <input type="radio" name={item.indicador} value="4" onChange={e => this.props.onChange(this.props.state, e)} />
                  </td>
                  <td>
                    <input type="radio" name={item.indicador} value="5" onChange={e => this.props.onChange(this.props.state, e)} />
                  </td>
                </tr>
              ))}
          </table>
        </form>
      </div>
    );
  }
}
