const { createContext, useContext } = require('react');

const StargazerContext = createContext({});

const useStargazerContext = () => {
  const { stargazerService } = useContext(StargazerContext);

  return {
    getStarred: stargazerService.getStarred,
    toggleStarred: stargazerService.toggleStarred,
  };
};

module.exports = {
  StargazerContext,
  useStargazerContext,
};
