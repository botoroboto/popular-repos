const React = require('react');
const { Routes, Route, Navigate } = require('react-router-dom');

const { ExploreTab } = require('./ExploreTab');
const { MyStarredTab } = require('./MyStarredTab');
const { StargazerContext } = require('../../../contexts/stargazer');
const { StargazerService } = require('../../../services/stargazer-service');

const PopularRepositories = ({ popularRepos, starredRepos }) => ( // TODO - We could "clean" initialFetch after first render
  <StargazerContext.Provider value={{ stargazerService: new StargazerService('guest') }}>
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

module.exports = {
  PopularRepositories,
};
