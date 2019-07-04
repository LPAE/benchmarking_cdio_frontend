import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Pages/Main/Main';
import Turma from './Pages/Turma/Turma';
import AddEquipe from './Pages/AddEquipe/AddEquipe';
import ConfigTurma from './Pages/ConfigTurma/ConfigTurma';
import Equipe from './Pages/Equipe/Equipe';
import EditEquipe from './Pages/EditEquipe/EditEquipe';
import EditExpectativa from './Pages/EditExpectativa/EditExpectativa';
import GraficosTurma from './Pages/GraficosTurma/GraficosTurma';
import Access from './Pages/Access/Access';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2979ff'
    },
    secondary: {
      main: '#64dd17'
    },
    lightPrimary: {
      main: '#B9D0FF'
    },
    darkPrimary: {
      main: '#174491'
    },
    lightSecondary: {
      main: '#3DF090'
    }
  },
  status: {
    danger: 'orange'
  }
});

const Routes = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/config" component={ConfigTurma} />
        <Route path="/access" component={Access} />
        <Route path="/turma/:curso/:projeto/:semestre/add" component={AddEquipe} />
        <Route path="/turma/:curso/:projeto/:semestre/edit" component={EditExpectativa} />
        <Route path="/turma/:curso/:projeto/:semestre/graficos" component={GraficosTurma} />
        <Route path="/turma/:curso/:projeto/:semestre/:equipe/edit" component={EditEquipe} />
        <Route path="/turma/:curso/:projeto/:semestre/:equipe" component={Equipe} />
        <Route path="/turma/:curso/:projeto/:semestre" component={Turma} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default Routes;
