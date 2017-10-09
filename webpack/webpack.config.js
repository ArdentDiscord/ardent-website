import webpack from 'webpack';
import { resolve, join } from 'path';

import {
  generateWebpackEntry,
  generateWebpackOutput,
  generateWebpackModule,
  generateWebpackResolve,
  generateWebpackDevtool,
  generateWebpackExternals,
  generateWebpackStats,
  generateWebpackPlugins
} from './generateWebpack';

const isProd = process.env.NODE_ENV !== 'development';

export default [
  // --->>> Client Config <<<---
  {
    name: 'client',
    context: resolve(__dirname, '../'), // Path for resolving entry points and loaders.
    entry: {
      server: generateWebpackEntry({ platform: 'web', production: isProd })
    },
    output: generateWebpackOutput({ platform: 'web', production: isProd }),
    module: generateWebpackModule({ platform: 'web', production: isProd }),
    resolve: generateWebpackResolve(),
    devtool: generateWebpackDevtool(isProd),
    target: 'web', // TODO: Omit this since the default is "web"?
    stats: generateWebpackStats(isProd),
    plugins: generateWebpackPlugins({ platform: 'web', production: isProd }),
    bail: true // Refuse to proceed if there are any errors.
  },
  // --->>> Server Config <<<---
  {
    name: 'server',
    context: resolve(__dirname, '../'), // Path for resolving entry points and loaders.
    entry: {
      server: generateWebpackEntry({ platform: 'node', production: isProd })
    },
    output: generateWebpackOutput({ platform: 'node', production: isProd }),
    module: generateWebpackModule({ platform: 'node', production: isProd }),
    resolve: generateWebpackResolve(),
    devtool: generateWebpackDevtool(isProd),
    target: 'node', // Target "node" for usage in Node.JS environments.
    externals: generateWebpackExternals({
      platform: 'node',
      production: isProd
    }),
    stats: generateWebpackStats(isProd),
    plugins: generateWebpackPlugins({ platform: 'node', production: isProd }),
    bail: true // Refuse to proceed if there are any errors.
  }
];
