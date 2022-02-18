const React = require('react');

const ErrorView = () => (
  <div>
    <h1>Whoops!</h1>
    <div>
      <p>There was some error obtaining this page.</p>
      <a href="/">Take me back to safety!</a>
    </div>
  </div>
);

module.exports = {
  ErrorView,
};
