const React = require('react');
const { Routes, Route, Navigate } = require('react-router-dom');
const { ExploreTab } = require('./ExploreTab');
const { MyStarredTab } = require('./MyStarredTab');

const PopularRepositories = ({ initialFetch }) => ( // TODO - We could "clean" initialFetch after first render
  <div className="popular-repositories">
    <Routes>
      <Route
        path="/explore"
        element={<ExploreTab initialFetch={initialFetch} />}
      />
      <Route
        path="/my-starred"
        element={<MyStarredTab />}
      />
      <Route path="*" element={<Navigate to="/explore" />} />
    </Routes>
  </div>
);

module.exports = {
  PopularRepositories,
};
