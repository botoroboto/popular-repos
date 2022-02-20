const { createContext, useContext } = require('react');

const StargazerContext = createContext({});

const useStargazerContext = () => {
  const { stargazerService } = useContext(StargazerContext);

  return {
    stargazerService,
  };
};

module.exports = {
  StargazerContext,
  useStargazerContext,
};
