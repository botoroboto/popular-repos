const express = require('express');
const router = express.Router();

const { render } = require('./controller');

router.get('/explore', render);

// Handle 404 with redirect
router.use((_, res) => res.redirect('/explore'));

module.exports = router;
