import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import AppContainer from '../containers/App/App';

const serverRender = ({ clientStats }) => (req, res) => {
  const reactRouterContext = {};
  const chunkNames = flushChunkNames();
  const { js } = flushChunks(clientStats, { chunkNames });

  const app = renderToString(
    <StaticRouter location={req.url} context={reactRouterContext}>
      <AppContainer />
    </StaticRouter>
  );
  /* eslint-disable */
  console.log('PATH', req.path);
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
  console.log('SCRIPTS SERVED', js);
  /* eslint-enable */

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>redux-first-router-boilerplate</title>
        </head>
        <body>
          <div id="root">${app}</div>
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`
  );
};

export default serverRender;
