var gulp = require('gulp');

var less = require('gulp-less');
var plovr = require('gulp-plovr');
var path = require('path');

var config = {
  wapLessDir: '/home/pig/ConceptDevelop/WorkSpace/CONCEPT/company-concept-design/company-framework/company-framework-client-lib/src/main/less'
};

gulp.task('default', ['less', 'js']); 

gulp.task('watch', ['less', 'js'], function () {
  gulp.watch(['./src/js/**/*.js'], ['js']);
  gulp.watch(['./src/less/**/*.less'], ['less']);
});

gulp.task('js', function () {
  return gulp.src(['./plovr.json'])
  .pipe(plovr({
    // debug: true
  }))
});

gulp.task('watch-less', ['less'], function () {
  gulp.watch(['./src/less/**/*.less'], ['less']);
});

gulp.task('less', function () {
  return gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [ config.wapLessDir ]
    }))
    .pipe(gulp.dest('./dest'));
});
