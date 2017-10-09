import webpack from 'webpack';
// import nodeExternals from "webpack-node-externals";
import StatsPlugin from 'stats-webpack-plugin';
import AutoDllPlugin from 'autodll-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import { resolve, join } from 'path';
import { generateWebpackModuleJS, generateWebpackModuleAssets } from './module';
import config from '../config';

// TODO: ADD EXTERNALS

export const generateWebpackEntry = env => {
  // Assign env object to helper Constants for easier refrence.
  const isProd = env.production;
  const isWeb = env.platform === 'web';
  const isNode = env.platform === 'node';

  switch (true) {
    // Production & Client
    case isProd && isWeb:
      return ['babel-polyfill', './src/client.js'];
    // Client
    case isWeb:
      return [
        'babel-polyfill',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
        'react-hot-loader/patch',
        './src/client.js'
      ];
    // Production & Server
    case isProd && isNode:
      return ['./src/server/render.js'];
    // Node
    case isNode:
      return ['./src/server/render.js'];
    default:
      break;
  }
  return null;
};

export const generateWebpackOutput = env => {
  // Assign env object to helper Constants for easier refrence.
  const isProd = env.production;
  const isWeb = env.platform === 'web';
  const isNode = env.platform === 'node';
  switch (true) {
    // Client
    case isWeb:
      return {
        path: resolve('./dist/client'),
        filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
        publicPath: '/static/',
        pathinfo: !isProd,
        chunkFilename: isProd
          ? '[name].[chunkhash:8].chunk.js'
          : '[name].chunk.js'
      };
    // Server
    case isNode:
      return {
        path: resolve('./dist/server'),
        filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
        libraryTarget: 'commonjs2',
        publicPath: '/static/',
        pathinfo: !isProd,
        chunkFilename: isProd
          ? '[name].[chunkhash:8].chunk.js'
          : '[name].chunk.js'
      };
    default:
      break;
  }
  return null;
};

export const generateWebpackModule = options => {
  const { platform, production } = options;
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: generateWebpackModuleJS(platform, production)
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: generateWebpackModuleAssets()
      }
    ]
  };
};

export const generateWebpackResolve = () => {
  const returnObject = {
    alias: {
      components: 'src/components',
      containers: 'src/containers'
    },
    extensions: ['.json', '.js', '.jsx']
  };
  return returnObject;
};

export const generateWebpackDevtool = isProd => {
  const returnObject = isProd ? 'source-map' : 'cheap-module-inline-source-map';
  return returnObject;
};

export const generateWebpackExternals = () => '';

export const generateWebpackStats = () => {
  switch (config.webpack.stats || 'normal') {
    case 'verbose':
      return 'verbose';
    case 'minimal':
      return 'minimal';
    case 'normal':
      return 'normal';
    default:
      return 'detailed';
  }
};

export const generateWebpackPlugins = env => {
  const isProd = env.production;
  const isWeb = env.platform === 'web';
  const isNode = env.platform === 'node';

  switch (true) {
    // Production & Client
    case isProd && isWeb:
      return [
        new StatsPlugin('stats.json'),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
          filename: '[name].[chunkhash:8].chunk.js',
          minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            screw_ie8: true,
            comments: false
          },
          sourceMap: true
        }),
        new AutoDllPlugin({
          filename: '[name].js',
          entry: {
            vendor: [
              'react',
              'react-dom',
              'react-redux',
              'redux',
              'history/createBrowserHistory',
              'transition-group',
              'redux-router-dom',
              'babel-polyfill'
            ]
          }
        })
      ];
    // Client
    case isWeb:
      return [
        new WriteFilePlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
          filename: '[name].chunk.js',
          minChunks: Infinity
        }),
        new AutoDllPlugin({
          filename: '[name].js',
          entry: {
            vendor: [
              'react',
              'react-dom',
              'react-redux',
              'redux',
              'history/createBrowserHistory',
              'transition-group',
              'redux-router-dom',
              'babel-polyfill'
            ]
          }
        })
      ];
    // Production & Server
    case isProd && isNode:
      return [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ];
    // Node
    case isNode:
      return [
        new WriteFilePlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.SERVER': JSON.stringify(true)
        }),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      ];
    default:
      break;
  }
  return null;
};
