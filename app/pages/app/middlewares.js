const moment = require('moment');

const { GithubService } = require('./services/github');

const fetchInitialData = (_, res, next) => {
  try {
    const service = new GithubService();
    const date = moment().subtract(1, 'week').format('YYYY-MM-DD');
    const popularRepos = { data: null, error: null };

    service.searchRepositories({ date })
      .then((data) => {
        popularRepos.data = data;
      })
      .catch((error) => {
        popularRepos.error = { message: error.message };
      })
      .finally(() => {
        res.preloadedData = {
          ...(res.preloadedData || {}),
          popularRepos,
        };
        next();
      });
  } catch (error) {
    console.error('Internal Server Error when prefetching popular repositories data.');
    // Do not fail if prefetching does not work, will fetch on client-side
    next();
  }
};

module.exports = {
  fetchInitialData,
};
