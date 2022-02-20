const router = require('express').Router();

const { GithubService } = require('../services/github');

router.get('/repositories', async (req, res, next) => {
  try {
    const { repositories, offset = 0, limit = 6 } = req.query || {};
    if (!repositories) {
      const error = new Error('Bad request. Parameter "repositories" is mandatory.');
      error.status = 400;
      throw error;
    }
    if (limit > 10) {
      const error = new Error('Bad request. Limit should be less than 10.');
      error.status = 400;
      throw error;
    }
    const endOffset = parseInt(offset) + parseInt(limit);
    const service = new GithubService();
    res.status(200).json(await service.getRepositories({ repositories: repositories.split(','), offset, endOffset }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
