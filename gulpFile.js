var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('vet', function() {
	return gulp
        .src('src/**/*.js')
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

gulp.task('hello-world', function() {
	console.log('hello!');
});

function log(msg) {
    console.log(msg);
}