const React = require('react');
const axios = require('axios');

const { Repositories } = require('../Repositories');
const { Dropdown } = require('../../../../../../components/Dropdown');

const { useEffect, useState } = React;

const ExploreTab = ({ initialFetch }) => {
  // TODO - If Github were to expose an accepted languages endpoint, we could consume so as to not hardcode this
  const [languageOptions] = useState([
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'c#', label: 'C#' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'python', label: 'Python' },
  ]);
  const [language, setLanguage] = useState();
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState((initialFetch && Array.isArray(initialFetch.data)) ? initialFetch.data : []);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchItems = async (language) => {
    try {
      setRequestError(null);
      setLoading(true);
      const { data } = await axios.get('/api/popular-repos/search', { params: { language }});
      setRepositories(data);
    } catch (error) {
      setRequestError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialFetch || !Array.isArray(initialFetch.data)) {
      fetchItems();
    }
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      fetchItems(language);
    }
  }, [language]);

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  return (
    <div className="explore-tab">
      <div className="heading">
        <h1 className="title">Showing the most popular repositories of this week</h1>
        <div>
          <Dropdown
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
          />
        </div>
      </div>
      {!loading && !requestError && (
        <Repositories repositories={repositories} />
      )}
      {loading && !requestError && ( // TODO - Change for a better indicator (skeleton, spinner, etc)
        <div>Loading...</div>
      )}
      {requestError && !loading && ( // TODO - Beautify + retry functionality
        <div>Whoops! Error: {requestError.message || 'Internal server error'}</div>
      )}
    </div>
  );
};

module.exports = {
  ExploreTab,
};
