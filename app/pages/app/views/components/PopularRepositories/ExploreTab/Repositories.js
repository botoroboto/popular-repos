const React = require('react');
const { RepositoryCard } = require('../RepositoryCard');

const Repositories = ({ repositories }) => (
  Array.isArray(repositories) && repositories.length > 0 ? (
    <div className="repositories">
      {repositories.map(RepositoryCard)}
    </div>
  ) : (
    <div>We could not find any results, try changing the search filters</div>
  )
);

module.exports = {
  Repositories,
};
