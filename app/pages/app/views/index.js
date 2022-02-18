const React = require('react');

const { Navbar } = require('./components/Navbar');
const { PopularRepositories } = require('./components/PopularRepositories');

const App = () => (
  <div className="app-container">
    <Navbar />
    <PopularRepositories />
  </div>
);

module.exports = {
  App,
};
