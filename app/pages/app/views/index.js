const React = require('react');

const { Navbar } = require('./components/Navbar');
const { PopularRepositories } = require('./components/PopularRepositories');

const App = ({ popularRepos, starredRepos }) => (
  <div className="app-container">
    <Navbar />
    <PopularRepositories popularRepos={popularRepos} starredRepos={starredRepos} />
  </div>
);

module.exports = {
  App,
};
