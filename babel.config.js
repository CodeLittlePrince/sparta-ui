module.exports = {
  'plugins': [
    'transform-vue-jsx',
    [
      '@babel/plugin-transform-runtime', {
        'corejs': {
          'version': 3,
          'proposals': true
        }
      }
    ]
  ],
  'presets': [
    ['@babel/preset-env']
  ],
  'env': {
    'test': {
      'plugins': [
        ['babel-plugin-istanbul', {
          'extension': ['.js', '.vue']
        }]
      ]
    }
  }
}