require('regenerator-runtime/runtime');

const React = require('react');
const ReactDOM = require('react-dom');

require('../pages/error/styles.scss');

const { ErrorView } = require('../pages/error/views');

ReactDOM.hydrate(
  <ErrorView />,
  document.getElementById('app'),
);
