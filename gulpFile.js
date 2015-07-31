var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var run = require('run-sequence');
var browserSync = require('browser-sync');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('build.dev', function(done) {
   run(['$templatecache', 'assets', 'lint'],
   'inject',
   'optimize.dev',
   done);
});

gulp.task('optimize.dev', function() {
    var assets = $.useref.assets({ searchPath: './' });
    var index = config.build.path + config.optimized.index;
    var jsAppFilter = $.filter('**/' + config.optimized.app);

    return gulp
        .src(index)
        .pipe(assets)
        .pipe($.sourcemaps.init())
        .pipe(jsAppFilter)
        .pipe($.babel())
        .pipe(jsAppFilter.restore())
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.build.path));
});

gulp.task('build', function() {
    run('clean',
        ['assets', '$templatecache'],
        'optimize'
    );
});

gulp.task('optimize', ['inject'], function() {
    var assets = $.useref.assets({ searchPath: './' });
    var index = config.build.path + 'index.html';
    var cssFilter = $.filter('**/' + config.optimized.css);
    var jsAppFilter = $.filter('**/' + config.optimized.app);
    var jsLibFilter = $.filter('**/' + config.optimized.lib);

    return gulp
        .src(index)
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore())
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsAppFilter.restore())
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build.path));
});

gulp.task('$templatecache', function() {
    return gulp
        .src(config.templateCache.html)
        .pipe($.minifyHtml(config.minifyOptions))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options))
        .pipe(gulp.dest(config.build.js));
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var series = require('stream-series');
    var seriesOptions = { read: false };
    var templateCache = config.build.js + config.templateCache.file;

    var lib = gulp.src(config.lib.js, seriesOptions);
    var main = gulp.src(config.app.js, seriesOptions);
    var templateStream = gulp.src(templateCache);

    return gulp
        .src(config.index)
        .pipe(wiredep(config.wiredepOptions()))
        .pipe($.inject(series(lib, main, templateStream)))
        .pipe($.inject(gulp.src(config.app.css)))
        .pipe(gulp.dest(config.build.path));
});

gulp.task('assets', ['favicon', 'glyphicons', 'font-awesome'], function() {
    return gulp
        .src(config.assets)
        .pipe(gulp.dest(config.build.assets));
});

gulp.task('favicon', function() {
    return gulp
        .src(config.favicon)
        .pipe(gulp.dest(config.build.path));
});

gulp.task('glyphicons', function() {
    var fonts = config.bower.directory + 'bootstrap/fonts/**.*';

    return gulp
        .src(fonts)
        .pipe(gulp.dest(config.build.fonts))
});

gulp.task('font-awesome', function() {
    var fonts = config.bower.directory + 'font-awesome/fonts/**.*';

    return gulp
        .src(fonts)
        .pipe(gulp.dest(config.build.fonts))
});

gulp.task('lint', function() {
    var files = [].concat(config.app.js)

    return gulp
        .src(files)
        .pipe($.jshint())
        .pipe($.jscs(config.jscs.options))
        .on('error', function() {
            notify('JSCS', 'JSCS Error! Check output.', this);
        })
        .pipe($.jscsStylish.combineWithHintResults())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .on('error', function() {
            notify('JSHINT', 'JSHINT Error! Check output', this);
        });
});

function notify(title, message, context) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        title: title,
        message: message
    };

    notifier.notify(notifyOptions);
    context.emit('end');
}

gulp.task('clean', function(done) {
    var files = config.build.path + '**/*.*';
    clean(files, done);
});

function clean(files, done) {
    log('Cleaning: ' + files);
    del(files, done);
}

function log(msg) {
    msg = msg || 'Nothing to Log';
    console.log(msg);
}

gulp.task('watch', ['browser-sync', 'watch.static'], function(){});

gulp.task('browser-sync', function() {
    browserSync.init(config.browserSync.options);
});

gulp.task('watch.static', function() {
    var files = [].concat(config.app.js, config.app.css, config.app.htmlTemplates);

    gulp.watch(files, ['build.dev']).on('change', browserSync.reload);
});
