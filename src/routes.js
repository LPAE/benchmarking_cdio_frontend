import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Pages/Main/Main';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main} />
    </Switch>
  </BrowserRouter>
)

export default Routes;