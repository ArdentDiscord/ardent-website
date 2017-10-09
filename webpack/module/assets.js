export default () => ({
    loader: 'url-loader',
    options: {
      name: '[hash].[ext]',
      limit: 10240,
      path: './dist/assets/images'
    }
  });
