const path = require('path');
const express = require('express');
const router = express.Router();

const { render: errorHandlerRoute } = require('../pages/error');

router.use((req, _, next) => {
  console.log('APP request', req.path); // TODO - Beautify
  next();
});

router.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));
router.use('/', require('../pages/demo'));
router.get('/some-error', (req, res, next) => {
  next(new Error('asd'));
});

router.use(errorHandlerRoute);
// TODO - Add error handling middleware

module.exports = router;
