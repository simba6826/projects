module.exports = function() {
  $.gulp.task('scripts:pages', function() {
    return $.gulp.src('./src/pages/**/*.js')
      .pipe($.gp.flatten())
      .pipe($.gulp.dest('./dist/assets/js/'));
      // TODO: Use webpack
  });

  $.gulp.task('scripts:common', function() {
    return $.gulp.src('./src/static/js/**/*.js')
      .pipe($.gp.flatten())
      .pipe($.gulp.dest('./dist/assets/js/'));
      // TODO: Use webpack
  });
};