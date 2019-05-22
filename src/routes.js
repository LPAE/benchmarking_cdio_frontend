import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Pages/Main/Main';
import Turma from './Pages/Turma/Turma';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route path='/turma/:id' component={Turma} />
    </Switch>
  </BrowserRouter>
)

export default Routes;