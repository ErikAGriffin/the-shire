// Karma configuration

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // A way to dynamically include angular-mocks
            // in the components file when running tests?
            'public/js/components.bundle.js',
            'public/js/**/*.bootstrap.js',
            'public/js/**/*.js',
            'public/js/**/*.html',
            'node_modules/angular-mocks/angular-mocks.js',
            'spec/js/**/*bootstrap.js',
            'spec/js/**/*.js'
        ],


        // list of files to exclude
        exclude: [
            // 'public/js/*components.js',
            'public/js/*components*.js',
            // 'public/js/pre-components.bundle.js',
            // 'public/js/post-components.bundle.js',
            'public/js/bundle.js'
        ],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/',
            //stripSufix: '.tmp',
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'directiveTemplates'
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public/js/**/*.html' : ['ng-html2js']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress','clear-screen'],

        // It seems clear-screen needs its plugin defined explicitly,
        // so all plugins need to go here. Really annoying, should
        // try to fix !!-- Fix karma clear-screen --!!
        plugins: [
            "karma-chrome-launcher",
            "karma-clear-screen-reporter",
            "karma-jasmine",
            "karma-ng-html2js-preprocessor",
            "karma-phantomjs-launcher"
        ],


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
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
