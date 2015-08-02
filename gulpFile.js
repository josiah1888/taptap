var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var run = require('run-sequence');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('build-dev', ['inject'], function() {
    var assets = $.useref.assets({ searchPath: './' });
    var index = config.build.path + 'index.html';

    return gulp
        .src(index)
        .pipe(assets)
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build.path));
});

gulp.task('build', function(done) {
    run('clean',
        ['assets', '$templatecache'],
        'optimize',
        done
    );
});

gulp.task('optimize', ['inject'], function() {
    var assets = $.useref.assets({ searchPath: './' });
    var index = config.build.path + 'index.html';
    var cssFilter = $.filter('**/' + config.optimized.css);
    var jsFilter = $.filter('**/' + config.optimized.app);

    return gulp
        .src(index)
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
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

    var libJs = gulp.src(config.lib.js, seriesOptions);
    var appJs = gulp.src(config.app.js, seriesOptions);
    var libCss = gulp.src(config.lib.css, seriesOptions);
    var appCss = gulp.src(config.app.css, seriesOptions);
    var templates = gulp.src(templateCache, seriesOptions);

    return gulp
        .src(config.optimized.index)
        .pipe(wiredep(config.wiredepOptions))
        .pipe($.inject(libJs, {starttag: '<!-- inject:lib:js -->'}))
        .pipe($.inject(series(appJs, templates), {starttag: '<!-- inject:app:js -->'}))
        .pipe($.inject(libCss, {starttag: '<!-- inject:lib:css -->'}))
        .pipe($.inject(appCss, {starttag: '<!-- inject:app:css -->'}))
        .pipe(gulp.dest(config.build.path));
});

gulp.task('assets', ['favicon', 'fonts'], function() {
    return gulp
        .src(config.assets)
        .pipe(gulp.dest(config.build.assets));
});

gulp.task('favicon', function() {
    return gulp
        .src(config.favicon)
        .pipe(gulp.dest(config.build.path));
});

gulp.task('fonts', function() {
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build.fonts))
});

gulp.task('vet', function() { // TODO fix this
    log('Vetting Files');
    return gulp
        .src(config.js)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

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