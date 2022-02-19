const React = require('react');

const Repositories = ({ repositories }) => (
  Array.isArray(repositories) && repositories.length > 0 ? (
    repositories.map(({ id, full_name }) => (
      <div key={id}>
        <p><b style={{ marginRight: 4 }}>Repo Name:</b>{full_name}</p>
      </div>
    ))
  ) : (
    <div>We could not find any results, try changing the search filters</div>
  )
);

module.exports = {
  Repositories,
};
