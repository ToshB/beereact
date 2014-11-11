'use strict';
var gulp = require('gulp'),
  browserify = require('browserify'),
  del = require('del'),
  reactify = require('reactify'),
  source = require('vinyl-source-stream'),
  server = require('gulp-express');

var paths = {
  html: ['app/src/*.html'],
  css: ['app/src/css/*.css'],
  js: ['app/src/js/**/*.js', 'app/src/js/**/*.jsx']
};

gulp.task('js', function () {
  return browserify({
    entries: './app/src/js/app.jsx',
    debug: true
  })
    .transform(reactify)
    .bundle()
    .on('error', function (err) {
      console.log(err.message);
      //this.end();
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('server', function (){
    server.run({
      file: 'app/index.js'
    });

  //livereload.listen();
  gulp.watch(paths.js, ['js']);
  gulp.watch('app/dist/**/*').on('change', server.notify);
  gulp.watch(paths.html).on('change', server.notify);
  gulp.watch(paths.css).on('change', server.notify);
  gulp.watch('app/index.js').on('change', server.run);
});

gulp.task('default', ['server', 'js']);


