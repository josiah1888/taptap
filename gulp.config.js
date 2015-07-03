module.exports = function() {
    var config = {
        minifyOptions: {
          empty: true
        },
        index: 'index.html',
        temp: {
            app: {
                js: 'temp/app/js/',
                css: 'temp/app/css/'
            },
            lib: {
                js: 'temp/lib/js/',
                css: 'temp/lib/css/'
            }
        },
        build: {
            index: 'build/',
            js: 'build/js/',
            css: 'build/css/',
            fonts: 'build/fonts/'
        },
        app: {
            js: 'src/**/*.js',
            scss: 'styles/styles.scss',
            htmlTemplates: 'src/**/*.html'
        },
        lib: {
            js: 'lib/js/**/*.min.js',
            css: 'styles/bootstrap.css',
            fonts: 'styles/fonts/**/*.*'
        },
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'taptap',
                standAlone: false
            }
        },
        defaultPort: 1234,
        nodeServer: 'server/app.js' //TODO make node server
    };

    return config;
};
