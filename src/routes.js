import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Pages/Main/Main';
import Turma from './Pages/Turma/Turma';
import AddEquipe from './Pages/AddEquipe/AddEquipe';
import ConfigTurma from './Pages/ConfigTurma/ConfigTurma';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/config" component={ConfigTurma} />
      <Route path="/turma/:curso/:projeto/:semestre/add" component={AddEquipe} />
      <Route path="/turma/:curso/:projeto/:semestre" component={Turma} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
