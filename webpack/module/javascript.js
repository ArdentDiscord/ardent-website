export default (platform, production) => {
  const isProd = production === true;
  return {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          'env',
          {
            targets: { browsers: ['last 2 versions'] },
            modules: false
          }
        ],
        'stage-1',
        'react'
      ],
      plugins: isProd
        ? [
            'universal-import',
            [
              'styled-components',
              {
                ssr: true
              }
            ]
          ]
        : [
            'universal-import',
            'react-hot-loader/babel',
            [
              'styled-components',
              {
                ssr: true,
                minify: false
              }
            ]
          ]
    }
  };
};
