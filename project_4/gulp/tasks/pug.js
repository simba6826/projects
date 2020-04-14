module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src('src/pages/**/*.pug')
      .pipe($.gp.pug())
      .on('error', $.gp.notify.onError(function (error) {
        return {
          title: 'Pug',
          message: error.message
        };
      }))
      .pipe($.gp.flatten())
      .pipe($.gulp.dest('dist/'));
  });
};