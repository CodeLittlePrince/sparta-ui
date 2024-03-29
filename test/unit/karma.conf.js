// Karma configuration
// Generated on Sun Mar 18 2018 20:05:04 GMT+0800 (CST)
const webpackConfig = require('../../webpack/components/webpack.config.test.js')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
      './index.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      process.env.BROWSER
      // 'Chrome',
      // 'SafariNative' // karma-safarinative-launcher
      // 'Safari', // karma-safari-launcher
      // 'Firefox', // karma-firefox-launcher
      // 'IE' // karma-ie-launcher
    ],

    // customLaunchers: {
    //   IE9: {
    //     base: 'IE',
    //     'x-ua-compatible': 'IE=EmulateIE9'
    //   },
    //   IE10: {
    //     base: 'IE',
    //     'x-ua-compatible': 'IE=EmulateIE10'
    //   },
    //   IE11: {
    //     base: 'IE',
    //     'x-ua-compatible': 'IE=EmulateIE11'
    //   }
    // },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: process.env.SINGLE_RUN === 'Y',

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
