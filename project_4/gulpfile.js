global.$ = {
  PATH: {
    task: require('./gulp/paths/tasks.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  fs: require('fs'),
  gulplog: require('gulplog'),
  webpackStream: require('webpack-stream'),
  webpack: require('webpack-stream').webpack,
  named: require('vinyl-named'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')(),
  path: require('path'),
  onChangeScript: function(file) {

  },
  reload: function(done) {
    $.browserSync.reload();
    done();
  }
};

$.PATH.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('src',
  $.gulp.series(
    'clean',
    $.gulp.parallel(
      'styles:pages:src',
      'styles:common:src',
      'pug',
      'webpack:src',
      'img:src',
      'fonts',
      'svg'
    ),
    $.reload
  )
);

$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'styles:dist',
    'pug',
    'webpack:build',
    'img:src',
    'fonts',
    'svg')));

$.gulp.task('default', $.gulp.series(
  'src',
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
