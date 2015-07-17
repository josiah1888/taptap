module.exports = function() {
    var config = {
        minifyOptions: {
          empty: true
        },
        index: 'index.html',
        assets: 'assets/**/*.*',
        favicon: 'favicon.ico',
        build: {
            assets: 'build/assets',
            path: 'build/',
            js: 'build/js/',
            css: 'build/css/',
            fonts: 'build/fonts/'
        },
        app: {
            js: 'src/**/*.js',
            css: 'styles/styles.css',
            scss: 'styles/styles.scss',
            htmlTemplates: 'src/**/*.html'
        },
        soundjs: 'lib/js/soundjs.min.js',
        templateCache: {
            html: 'src/**/*.html',
            file: 'templates.js',
            options: {
                module: 'taptap',
                standAlone: false
            }
        },
        optimized: {
            css: 'all.css',
            app: 'app.js',
            lib: 'lib.js'
        },
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../'
        },
    };

    config.wiredepOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
