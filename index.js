const config = require('./config');
const apiRouter = require('./api');
const appRouter = require('./app/server');

const app = require('express')();
const port = config.port;

app.use(config.apiBasePath, apiRouter);
app.use(config.appBasePath, appRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
