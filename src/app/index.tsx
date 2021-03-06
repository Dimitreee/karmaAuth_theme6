import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers';
import { MainScreen } from 'app/containers';

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route path="/" component={MainScreen} />
      </Switch>
    </Router>
  </Root>
));
