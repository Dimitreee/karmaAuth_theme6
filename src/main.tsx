import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { createBrowserHistory } from 'history';
import { App } from 'app';
import injectGlobalStyles from './injectGlobal';

injectGlobalStyles();
useStrict(true);

const history = createBrowserHistory();

const Application = () => <App history={history} />;

ReactDOM.render(<Application />, document.getElementById('root'));
