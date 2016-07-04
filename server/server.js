import React from 'react';
import ReactDOMServer from 'react-dom/server'
import path from 'path'

import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, createMemoryHistory, RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../app/store';

import createRoutes from '../app/routes';

import express from 'express';

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

const __PROD__ = process.env.NODE_ENV === 'production'
const __TEST__ = process.env.NODE_ENV === 'test'

if (__PROD__ || __TEST__) {
  const config = require('../webpack/webpack.client.prod')
  app.use(compression())
  app.use(config.output.publicPath, express.static(config.output.path))
} else {
  const config = require('../webpack/webpack.client.dev')
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(config)
  const middleware = webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: true,
      modules: false
    }
  })
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }))
}

app.use(renderingMiddleware);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function renderingMiddleware(req, res) {

  const store = configureStore({});

  const routes = createRoutes(store);
  const history = createMemoryHistory(req.originalUrl);


  match({ routes, history }, (err, redirectLocation, renderProps) => {

    const assets = require('../assets.json');
    const initialState = store.getState();
    const component = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    if (err) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const html = ReactDOMServer.renderToString(component);

      res.status(200).render('index', {
        assets: assets,
        html: html
      });
    } else {
      res.status(404).send('Not found')
    }




  });
}



