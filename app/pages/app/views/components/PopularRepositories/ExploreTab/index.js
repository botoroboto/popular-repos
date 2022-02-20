const React = require('react');
const axios = require('axios');
const { Repositories } = require('../Repositories');

const { useEffect, useState } = React;

const ExploreTab = ({ initialFetch }) => {
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
    <div className="explore-tab">
      <h1 className="title">Showing the most popular repositories of this week</h1>
      {!loading && !requestError && (
        <Repositories repositories={repositories} />
      )}
      {loading && !requestError && ( // TODO - Change for a better indicator (skeleton, spinner, etc)
        <div>Loading...</div>
      )}
      {requestError && !loading && (
        <div>Whoops! Error: {requestError.message || 'Internal server error'}</div>
      )}
    </div>
  );
};

module.exports = {
  ExploreTab,
};
