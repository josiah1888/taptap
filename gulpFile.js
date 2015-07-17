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

    var soundjs = gulp.src(config.soundjs, seriesOptions);
    var main = gulp.src(config.app.js, seriesOptions);
    var templateStream = gulp.src(templateCache);

    return gulp
        .src(config.index)
        .pipe(wiredep(config.wiredepOptions()))
        .pipe($.inject(series(soundjs, main, templateStream)))
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