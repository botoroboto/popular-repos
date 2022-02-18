const router = require('express').Router();

const { GithubService } = require('../services/github');

router.get('/search', async (req, res, next) => {
  try {
    const { date = '', language = null } = req.query || {};
    const service = new GithubService();
    // TODO - Transform data
    /*
      Ideas for transform:
        - repo_name (item.name)
        - repo_url (item.html_url)
        - owner_name (item.owner.login)
        - owner_url (item.owner.html_url)
        - star_count (item.stargazers_count)
        - last_updated (item.updated_at)
        - description (item.description)
        - language (item.language)
        - id (item.id)
    */
    res.status(200).json((await service.searchRepositories(date, language)).items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
