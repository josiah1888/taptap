module.exports = function() {
    var build = 'build/';
    var lib = 'lib/';
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: '../'
    };

    var config = {
        minifyOptions: {
          empty: true
        },
        assets: 'assets/**/*.*',
        favicon: 'favicon.ico',
        fonts: [bower.directory + 'bootstrap/fonts/**.*', bower.directory + 'font-awesome/fonts/**.*'],
        build: {
            assets: build + 'assets',
            path: build,
            js: build + 'js/',
            css: build + 'css/',
            fonts: build + 'fonts/'
        },
        app: {
            js: 'src/**/*.js',
            css: 'styles/styles.css',
            htmlTemplates: 'src/**/*.html'
        },
        lib: {
            js: lib + 'js/soundjs.min.js',
            css: [
                lib + 'css/bootstrap.min.css',
                lib + 'css/font-awesome.min.css'
            ]
        },
        templateCache: {
            html: 'src/**/*.html',
            file: 'templates.js',
            options: {
                module: 'taptap',
                standAlone: false
            }
        },
        optimized: {
            css: 'app.css',
            app: 'app.js',
            lib: 'lib.js',
            index: 'index.html'
        },
        browserSync: {
            options: {
                proxy: 'localhost:1234',
                port: '1239'
            }
        },
        jscs: {
            options: {
                configPath: '.jscsrc'
            }
        },
        bower: bower,
        wiredepOptions: {
            bowerJson: bower.json,
            directory: bower.directory,
            ignorePath: bower.ignorePath
        }
    };

    return config;
};
