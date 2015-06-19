var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('vet', function() {
	return gulp
        .src('src/**/*.js')
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

gulp.task('styles', function() {
   return gulp.src(styles)
});




gulp.task('go', function() {
	return gulp
		.src('src/**/*.js')
        .pipe(concat('all.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('hello-world', function() {
	console.log('hello!');
});

function log(msg) {
    console.log(msg);
}