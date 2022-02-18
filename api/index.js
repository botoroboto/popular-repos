const router = require('express').Router();

const popularReposRouter = require('../app/pages/app/api');

router.use((req, _, next) => {
  console.log('API request', req.path); // TODO - Beautify
  next();
});

router.use('/popular-repos', popularReposRouter);

// TODO - Could generalize
// 404 handler
router.use((_, __, next) => {
  const notFoundError = new Error('404 requesting');
  notFoundError.status = 404;
  console.warn(notFoundError.message);
  next(notFoundError);
});

// TODO - Could generalize
// Error handler
router.use((error, _, res, next) => {
  console.error('Error: ', { error: error.message });
  const errorStatus = error && error.response && error.response.status;
  res.status(errorStatus);
  next(error);
});

module.exports = router;
