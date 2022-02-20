const React = require('react');
const Paginator = require('react-hooks-paginator/dist/index.cjs');

const { Repositories } = require('../Repositories');
const { useStargazerContext } = require('../../../../contexts/stargazer');

const { useState, useEffect } = React;

const MyStarredTab = ({ initialFetch }) => {
  const { stargazerService } = useStargazerContext();
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState((initialFetch && Array.isArray(initialFetch.data)) ? initialFetch.data : []);
  const [limit] = useState(6);
  const [totalItems, setTotalItems] = useState((initialFetch && initialFetch.total) || 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchItems = async (itemOffset, endOffset) => {
    try {
      setRequestError(null);
      setLoading(true);
      const { total, data, error } = await stargazerService.fetchStarred(itemOffset, endOffset);
      setTotalItems(total);
      setRepositories(data);
      setRequestError(error);
    } catch (error) {
      setRequestError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialFetch || !Array.isArray(initialFetch.data)) {
      fetchItems(0, limit);
      setIsFirstRender(false);
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      fetchItems(offset, limit);
    }
  }, [offset]);

  return (
    <div className="my-starred-tab">
      <h1 className="title">My Starred repositories</h1>
      {!loading && !requestError && (
        <div className="pagination-container">
          <Repositories repositories={repositories} />
          <div>
            <Paginator
              totalRecords={totalItems}
              pageLimit={limit}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
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
