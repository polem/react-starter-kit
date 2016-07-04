import React from 'react';
import HomePage from './containers/HomePage';
import App from './containers/App';
import { Route, IndexRoute } from 'react-router';

export default function createRoutes(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
    </Route>
  );
}
