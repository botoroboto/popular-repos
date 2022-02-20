const router = require('express').Router();
const moment = require('moment');

const { GithubService } = require('../services/github');

router.get('/search', async (req, res, next) => {
  try {
    const { date = '', language = null } = req.query || {};
    const date_filter = (typeof date === 'string' && moment(date).isValid()) ? date : moment().subtract(1, 'week').format('YYYY-MM-DD');
    const service = new GithubService();
    res.status(200).json(await service.searchRepositories({ date: date_filter, language }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
