const React = require('react');
const axios = require('axios');
const { useEffect, useState } = React;

const PopularRepositories = ({ initialFetch }) => {
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState((initialFetch && Array.isArray(initialFetch.data)) ? initialFetch.data : []);

  useEffect(() => {
    if (!initialFetch || !Array.isArray(initialFetch.data)) {
      (async () => {
        try {
          setRequestError(null);
          setLoading(true);
          const { data } = await axios.get('/api/popular-repos/search');
          setRepositories(data);
        } catch (error) {
          setRequestError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
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
