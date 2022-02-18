require('regenerator-runtime/runtime');

const React = require('react');
const ReactDOM = require('react-dom');

require('../pages/app/styles.scss');

const { App } = require('../pages/app/views');

ReactDOM.hydrate(
  <App {...window.__PRELOADED_DATA__} />
  ,
  document.getElementById('app'),
);
