const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const { ErrorView } = require('./views');

const render = (error, _, res, __) => {
  console.error('Error: ', { error: error.message });
  const htmlFile = path.resolve(path.join(__dirname, '..', '..', '..', 'dist', 'static', 'error.html'));

  const appHtml = ReactDOMServer.renderToStaticMarkup(
    <ErrorView />
  );

  fs.readFile(htmlFile, 'utf-8', (error, htmlData) => {
    if (error) {
      const message = 'Internal server error: Could not read server HTML';
      console.error(message);
      res.status(500).json({ message, error });
      return;
    }

    const transformedHtml = htmlData
      // Changes placeholder for SSR app
      .replace('{{children}}', appHtml)
      // Remove placeholder
      .replace('{{preloadedData}}', '');
    res.status((error && error.status) || 500).send(transformedHtml);
  });
};

module.exports = {
  render,
};
