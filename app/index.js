import React from 'react';
import ReactDOM from 'react-dom';

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import 'file?name=[name].[ext]!./favicon.ico';

import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

const initialState = {};
const store = configureStore(initialState, browserHistory);

// Set up the router, wrapping all Routes in the App component
import App from 'containers/App';
import createRoutes from './routes';

const rootRoute = createRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <Router
     history={browserHistory}
     routes={rootRoute}
    />
  </Provider>,
  document.getElementById('root')
);


