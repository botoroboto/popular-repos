const path = require('path');
const express = require('express');
const router = express.Router();

const { render: errorHandlerRoute } = require('../pages/error');

router.use((req, _, next) => {
  console.log('APP request', req.path); // TODO - Beautify
  next();
});

router.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));
router.use('/', require('../pages/app'));

router.use(errorHandlerRoute);

module.exports = router;
