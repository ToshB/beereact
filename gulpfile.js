'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

var paths = {
  css: ['src/css/*.css'],
  js: ['src/js/**/*.js', 'src/js/**/*.jsx']
};

gulp.task('clean', function (done) {
  del(['build'], done);
});

gulp.task('css', ['clean'], function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest('./src'));
});

gulp.task('js', ['clean'], function () {
  return browserify({
    entries: './src/js/app.jsx',
    debug: true
  })
    .transform(reactify)
    .bundle()
    .on('error', function(err){
      console.log(err.message);
      //this.end();
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch('src/*').on('change', livereload.changed);
});

gulp.task('default', ['watch', 'css', 'js']);


