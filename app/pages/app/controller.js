const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const serialize = require('serialize-javascript');
const path = require('path');
const fs = require('fs');

const { App } = require('./views');

const preloadedDataScript = (data) => (
  `<script id="__PRELOADED_DATA__">
  (function (win, doc) {
    function setPreloadedData() {
      win.__PRELOADED_DATA__ = ${JSON.parse(serialize(JSON.stringify(data)))}
    }
    setPreloadedData();
    if (doc.readyState === 'complete') {
      setPreloadedData();
      win.removeEventListener('load', setPreloadedData);
    } else {
      win.addEventListener('load', setPreloadedData);
    }
  })(window, document);
</script>`);

const render = (req, res) => {
  const htmlFile = path.resolve(path.join(__dirname, '..', '..', '..', 'dist', 'static', 'app.html'));

  res.preloadedData = {
    ...(res.preloadedData || {}),
    requestPath: req.path,
  };

  const appHtml = ReactDOMServer.renderToStaticMarkup(
    <StaticRouter location={req.path}>
      <App {...res.preloadedData} />
    </StaticRouter>
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
      // Changes placeholder for preloaded data
      .replace('{{preloadedData}}', preloadedDataScript(res.preloadedData));
    res.send(transformedHtml);
  });
};

module.exports = {
  render,
};
