const React = require('react');

const { Navbar } = require('./components/Navbar');
const { PopularRepositories } = require('./components/PopularRepositories');

const App = ({ popularRepos }) => (
  <div className="app-container">
    <Navbar />
    <PopularRepositories initialFetch={popularRepos} />
  </div>
);

module.exports = {
  App,
};
