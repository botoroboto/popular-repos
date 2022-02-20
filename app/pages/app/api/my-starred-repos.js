const router = require('express').Router();

const { GithubService } = require('../services/github');

router.get('/repositories', async (req, res, next) => {
  try {
    const { repositories } = req.query || {};
    if (!repositories) {
      const error = new Error('Bad request. Parameter "repositories" is mandatory.');
      error.status = 400;
      throw error;
    }
    const service = new GithubService();
    res.status(200).json(await service.getRepositories({ repositories: repositories.split(',') }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
