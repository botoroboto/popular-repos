const React = require('react');

const { Repositories } = require('../Repositories');
const { useStargazerContext } = require('../../../../contexts/stargazer');

const { useState, useEffect } = React;

const MyStarredTab = ({ initialFetch }) => {
  const { getStarred } = useStargazerContext();
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState((initialFetch && Array.isArray(initialFetch.data)) ? initialFetch.data : []);

  useEffect(() => {
    if (!initialFetch || !Array.isArray(initialFetch.data)) {
      (async () => {
        try {
          setRequestError(null);
          setLoading(true);
          const { data, error } = await getStarred();
          setRepositories(data);
          setRequestError(error);
        } catch (error) {
          setRequestError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  return (
    <div className="my-starred-tab">
      <h1 className="title">My Starred repositories</h1>
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
  MyStarredTab,
};
