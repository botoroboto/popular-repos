const express = require('express');
const router = express.Router();

const { fetchInitialPopularRepos, fetchInitialStarredRepos } = require('./middlewares');
const { render } = require('./controller');

router.get('/explore', fetchInitialPopularRepos, render);
router.get('/my-starred', fetchInitialStarredRepos, render);

// Handle 404 with redirect
router.use((_, res) => res.redirect('/explore'));

module.exports = router;
