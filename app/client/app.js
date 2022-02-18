require('regenerator-runtime/runtime');

const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

require('../pages/app/styles.scss');

const { App } = require('../pages/app/views');

ReactDOM.hydrate(
  <BrowserRouter>
    <App {...window.__PRELOADED_DATA__} />
  </BrowserRouter>
  ,
  document.getElementById('app'),
);
