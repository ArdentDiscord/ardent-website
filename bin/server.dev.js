import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from '../webpack/webpack.config';
import app from '../src/server';

const publicPath = config[0].output.publicPath;
const outputPath = config[0].output.path;

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath,
    serverSideRender: true,
    stats: { colors: true }
  })
);
app.use(
  webpackHotMiddleware(compiler.compilers.find(comp => comp.name === 'client'))
);
app.use(
  webpackHotServerMiddleware(compiler, {
    chunkName: 'server',
    serverRendererOptions: { outputPath }
  })
);

let isBuilt = false;

compiler.plugin('done', () => {
  if (!isBuilt) {
    app.listen(3000, () => {
      isBuilt = true;
      console.log(`Listening @ http://localhost:${3000}/`); // eslint-disable-line no-console
    });
  }
});
