const React = require('react');
const axios = require('axios');
const { useEffect, useState } = React;

const PopularRepositories = () => {
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setRequestError(null);
        setLoading(true);
        const { data } = await axios.get('https://api.github.com/search/repositories?q=created:%3E2022-02-05&sort=stars&order=desc');
        setRepositories(data.items);
      } catch (error) {
        setRequestError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="popular-repositories">
      <h3>Showing the most popular repositories of last week</h3>
      {!loading && !requestError && Array.isArray(repositories) && repositories.map(({ id, full_name }) => (
        <div key={id}>
          <p><b style={{ marginRight: 4 }}>Repo Name:</b>{full_name}</p>
        </div>
      ))}
      {loading && !requestError && ( // TODO - Change for a spinner or something
        <div>Loading...</div>
      )}
      {requestError && !loading && (
        <div>Whoops! Error: {requestError.message || 'Internal server error'}</div>
      )}
    </div>
  );
};

module.exports = {
  PopularRepositories,
};
