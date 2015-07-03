var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');

var $ = require('gulp-load-plugins')({lazy: true});
var run = require('run-sequence');

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

var port = process.env.PORT || config.defaultPort; //TODO something

gulp.task('vet', function() {
    log('Vetting Files');
	return gulp
        .src(config.js)
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function() {
    log('Compiling Styles');
    run(['app-styles', 'lib-styles']);
});

gulp.task('app-styles', function() {
    return gulp
        .src(config.app.scss)
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp.app.css));
});

gulp.task('lib-styles', function() {
    return gulp
        .src(config.lib.css)
        .pipe(gulp.dest(config.temp.lib.css));
});

gulp.task('sass-watch', function () {
	gulp.watch(config.scss, ['styles']);
});

function log(msg) {
    msg = msg || 'Nothing to Log';
    console.log(msg);
}

gulp.task('clean-styles', function() {
	var files = [].concat(
        config.temp.app.css,
        config.temp.lib.css,
        config.build.css);
	clean(files);
});

gulp.task('clean-js', function() {
    var files = [].concat(
        config.build.js,
        config.temp.app.js,
        config.temp.lib.js);
    clean(files);
});

gulp.task('clean-fonts', function() {
    var files = config.build.fonts;
    clean(files);
});

gulp.task('clean', function() {
	run(['clean-js', 'clean-styles', 'clean-fonts', 'clean-index']);
});

function clean(files) {
    log('Cleaning: ' + files);
    del(files);
}

gulp.task('template-cache', function() {
   log('Creating AngularJS $templateCache');

    return gulp
        .src(config.app.htmlTemplates)
        .pipe($.minifyHtml(config.minifyOptions))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp.app.js));
});

gulp.task('build', function() {
	run('clean',
        ['styles', 'fonts', 'js', 'template-cache'],
        ['optimize-styles', 'optimize-index', 'optimize-js']
	);
});

gulp.task('optimize-index', function() {
   return gulp
       .src(config.index)
       .pipe($.minifyHtml(config.minifyOptions))
       .pipe(gulp.dest(config.build.index));
});

gulp.task('clean-index', function() {
   var files = config.build.index;
    clean(files);
});

gulp.task('optimize-js', function() {
    run(['optimize-app-js', 'optimize-lib-js']);
});

gulp.task('optimize-app-js', function() {
    return gulp
        .src(config.temp.app.js + '**/*.js')
        //.pipe($.concat('all.js'))
        //.pipe($.uglify())
        .pipe(gulp.dest(config.build.js));
});

gulp.task('optimize-lib-js', function() {
    return gulp
        .src(config.temp.lib.js + '**/*.*')
        .pipe($.concat('lib.js'))
        //.pipe($.uglify())
        .pipe(gulp.dest(config.build.js));
});

gulp.task('fonts', function() {
    return gulp
        .src(config.lib.fonts)
        .pipe(gulp.dest(config.build.fonts))
});

gulp.task('js', function() {
    run(['app-js', 'lib-js']);
});

gulp.task('app-js', function() {
    return gulp
        .src(config.app.js)
        .pipe(gulp.dest(config.temp.app.js));
});

gulp.task('lib-js', function() {
    return gulp
        .src(config.lib.js)
        .pipe(gulp.dest(config.temp.lib.js));
});

gulp.task('optimize-styles', function() {
    run(['optimize-app-styles', 'optimize-lib-styles']);
});

gulp.task('optimize-app-styles', function() {
    return gulp
        .src(config.temp.app.css + '**/*.css')
        .pipe($.concat('styles.css'))
        .pipe(gulp.dest(config.build.css));
});

gulp.task('optimize-lib-styles', function() {
    return gulp
        .src(config.temp.lib.css + '**/*.css')
        .pipe($.concat('lib.css'))
        .pipe(gulp.dest(config.build.css));
});

//gulp.task('wiredep', function() {
//   var options = config.getWiredepDefaultOptions(); //TODO
//
//    return gulp
//        .src(config.index)
//        .pipe(wiredep(options))
//        .pipe($.inject(gulp.src(config.lib.js)))
//        .pipe(gulp.dest(config.))
//});

gulp.task('serve-dev', function() {
   var isDev = true;

    var options = {
     script: config.nodeServer, //TODO app.js
       delayTime: 1,
       env: {
           'PORT': port,
           'NOE_ENV': isDev ? 'dev' : 'build'
       },
        watch: [config.server] //TODO define files to restart server on
   };

    return nodemon(options);
});