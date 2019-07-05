import React from 'react';
import AreaForm from './AreaForm';
import { Grid, Button, withStyles } from '@material-ui/core';

import { areaConcepcao, areaDesign, areaImplementacao, areaOperacao } from '../CDIO_Texts';
import Alert from './Alert';

const styles = theme => ({
  root: {
    maxWidth: '1200px', // tamanho fixo para telas grandes
    margin: 'auto'
  },
  submitButton: {
    margin: theme.spacing(4)
  }
});

export default withStyles(styles)(
  class AreasForm extends React.Component {
    state = {
      concepcaoState: {},
      designState: {},
      implementacaoState: {},
      operacaoState: {},
      concepcaoMetrica: {},
      designMetrica: {},
      implementacaoMetrica: {},
      operacaoMetrica: {},
      alert: false
    };

    componentDidMount() {
      const {
        concepcao,
        design,
        implementacao,
        operacao,
        concepcaoMetrica,
        designMetrica,
        implementacaoMetrica,
        operacaoMetrica
      } = this.props;

      let state = this.state;

      if (concepcao) {
        state.concepcaoState = this.props.concepcao;
      } else {
        areaConcepcao.item.map(item => (state.concepcaoState[item.indicador] = '0'));
      }
      if (design) {
        state.designState = this.props.design;
      } else {
        areaDesign.item.map(item => (state.designState[item.indicador] = '0'));
      }
      if (implementacao) {
        state.implementacaoState = this.props.implementacao;
      } else {
        areaImplementacao.item.map(item => (state.implementacaoState[item.indicador] = '0'));
      }
      if (operacao) {
        state.operacaoState = this.props.operacao;
      } else {
        areaOperacao.item.map(item => (state.operacaoState[item.indicador] = '0'));
      }

      if (concepcaoMetrica) {
        state.concepcaoMetrica = this.props.concepcaoMetrica;
      } else {
        areaConcepcao.item.map(item => (state.concepcaoMetrica[item.indicador] = '0'));
      }
      if (designMetrica) {
        state.designMetrica = this.props.designMetrica;
      } else {
        areaDesign.item.map(item => (state.designMetrica[item.indicador] = '0'));
      }
      if (implementacaoMetrica) {
        state.implementacaoMetrica = this.props.implementacaoMetrica;
      } else {
        areaImplementacao.item.map(item => (state.implementacaoMetrica[item.indicador] = '0'));
      }
      if (operacaoMetrica) {
        state.operacaoMetrica = this.props.operacaoMetrica;
      } else {
        areaOperacao.item.map(item => (state.operacaoMetrica[item.indicador] = '0'));
      }

      this.setState({ ...state });
    }

    areaIsComplete = area => {
      return !Object.values(area).includes('0');
    };

    fillArea = () => {
      let areas = {};

      if (this.areaIsComplete(this.state.concepcaoState)) {
        areas['concepcao'] = this.state.concepcaoState;
      }
      if (this.areaIsComplete(this.state.designState)) {
        areas['design'] = this.state.designState;
      }
      if (this.areaIsComplete(this.state.implementacaoState)) {
        areas['implementacao'] = this.state.implementacaoState;
      }
      if (this.areaIsComplete(this.state.operacaoState)) {
        areas['operacao'] = this.state.operacaoState;
      }
      return areas;
    };

    fillMetrica = () => {
      let metrica = {};

      if (this.areaIsComplete(this.state.concepcaoMetrica)) {
        metrica['concepcao'] = this.state.concepcaoMetrica;
      }
      if (this.areaIsComplete(this.state.designMetrica)) {
        metrica['design'] = this.state.designMetrica;
      }
      if (this.areaIsComplete(this.state.implementacaoMetrica)) {
        metrica['implementacao'] = this.state.implementacaoMetrica;
      }
      if (this.areaIsComplete(this.state.operacaoMetrica)) {
        metrica['operacao'] = this.state.operacaoMetrica;
      }
      return metrica;
    };

    buttonSubmit = async e => {
      e.preventDefault();
      const areas = this.fillArea();
      const metricas = this.fillMetrica();
      if (
        (this.props.mostrarMetrica && Object.keys(metricas).length !== 0 && Object.keys(areas).length !== 0) ||
        (!this.props.mostrarMetricas && Object.keys(areas).length !== 0)
      ) {
        this.props.callback(areas, metricas);
      } else {
        this.setState({ alert: true });
      }
    };

    handleAreaChange = (stateName, e) => {
      const { name, value } = e.target;
      this.setState({
        [stateName]: { ...this.state[stateName], [name.split('_')[1]]: value }
      });
      console.log(this.state);
    };

    render() {
      const { classes } = this.props;
      return (
        <Grid container direction="column" wrap='nowrap' className={classes.root}>
          {this.props.children}

          {!this.props.hideConcepcao && (
            <AreaForm
              area={areaConcepcao}
              onChange={this.handleAreaChange}
              state={this.state.concepcaoState}
              stateName="concepcaoState"
              stateMetrica={this.state.concepcaoMetrica}
              stateNameMetrica="concepcaoMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
              mostrarMetrica={this.props.mostrarMetrica}
            />
          )}

          {!this.props.hideDesign && (
            <AreaForm
              area={areaDesign}
              onChange={this.handleAreaChange}
              state={this.state.designState}
              stateName="designState"
              stateMetrica={this.state.designMetrica}
              stateNameMetrica="designMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
              mostrarMetrica={this.props.mostrarMetrica}
            />
          )}
          {!this.props.hideImplementacao && (
            <AreaForm
              area={areaImplementacao}
              onChange={this.handleAreaChange}
              state={this.state.implementacaoState}
              stateName="implementacaoState"
              stateMetrica={this.state.implementacaoMetrica}
              stateNameMetrica="implementacaoMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
              mostrarMetrica={this.props.mostrarMetrica}
            />
          )}
          {!this.props.hideOperacao && (
            <AreaForm
              area={areaOperacao}
              onChange={this.handleAreaChange}
              state={this.state.operacaoState}
              stateName="operacaoState"
              stateMetrica={this.state.operacaoMetrica}
              stateNameMetrica="operacaoMetrica"
              mostrarDescricao={this.props.mostrarDescricao}
              mostrarMetrica={this.props.mostrarMetrica}
            />
          )}

          <Button className={classes.submitButton} color="secondary" variant="contained" onClick={this.buttonSubmit}>
            Confirmar
          </Button>
          <Alert
            text="Preencha todos os itens de pelo menos uma Área"
            open={this.state.alert}
            handleClose={e => this.setState({ alert: false })}
          />
        </Grid>
      );
    }

    static defaultProps = {
      mostrarDescricao: false,
      mostrarMetrica: false
    };
  }
);
