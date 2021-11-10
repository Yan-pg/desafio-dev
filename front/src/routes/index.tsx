import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Upload } from '../pages/Upload';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/Upload" component={Upload} />
    </Switch>
  </Router>
);

export default Routes;
