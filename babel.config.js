module.exports = {
  'presets': [
    [
      '@babel/env',
      {
        'modules': false,
        'useBuiltIns': 'usage',
        'corejs': '3'
      }
    ]
  ],
  'plugins': [
    'transform-vue-jsx',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-object-rest-spread', { 'loose': true, 'useBuiltIns': true }], // babel-preset-env已依赖安装
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ['@babel/plugin-proposal-private-methods', { 'loose': true }],
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