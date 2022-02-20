const React = require('react');
const { Routes, Route, Navigate } = require('react-router-dom');

const { ExploreTab } = require('./ExploreTab');
const { MyStarredTab } = require('./MyStarredTab');
const { StargazerContext } = require('../../../contexts/stargazer');
const { StargazerService } = require('../../../contexts/stargazer/stargazer-service');

const { useState } = React;

const PopularRepositories = ({ popularRepos, starredRepos }) => {
  const [stargazerService] = useState(new StargazerService('guest'));

  return ( // TODO - We could "clean" initialFetch after first render
    <StargazerContext.Provider value={{ stargazerService }}>
      <div className="popular-repositories">
        <Routes>
          <Route
            path="/explore"
            element={<ExploreTab initialFetch={popularRepos} />}
          />
          <Route
            path="/my-starred"
            element={<MyStarredTab initialFetch={starredRepos} />}
          />
          <Route path="*" element={<Navigate to="/explore" />} />
        </Routes>
      </div>
    </StargazerContext.Provider>
  );
};

module.exports = {
  PopularRepositories,
};
