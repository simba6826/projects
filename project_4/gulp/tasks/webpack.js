module.exports = function() {
  $.gulp.task('webpack:src', function(callback) {
    let firstBuildReady = false;

    function done(err, stats) {
      firstBuildReady = true;

      if (err) {
        return;
      }

      $.gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
        colors: true
      }));
    }

    let options = {
      watch: true,
      devtool: 'cheap-module-inline-source-map',
      mode: 'development',
      module: {
        rules: [{
          test: /\.js$/,
          include: $.path.join(__dirname, 'src'),
          loader: 'babel$presets[]=es2015'
        }]
      },
      plugins: [
        new $.webpack.NoEmitOnErrorsPlugin()
      ]
    };

    return $.gulp.src(['src/pages/**/*.js', 'src/static/js/*.js'])
      .pipe($.gp.plumber({
        errorHandler: $.gp.notify.onError(err => ({
          title: 'Webpack',
          message: err.message
        }))
      }))
      .pipe($.named())
      .pipe($.webpackStream(options, null, done))
      .pipe($.gp.flatten())
      .pipe($.gulp.dest('dist/assets/js/'))
      .on('data', function() {
        if (firstBuildReady) {
          callback();
        }
      });
  });

  $.gulp.task('webpack:build', function(callback) {
    let firstBuildReady = false;

    function done(err, stats) {
      firstBuildReady = true;

      if (err) {
        return;
      }

      $.gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
        colors: true
      }));
    }

    let options = {
      watch: false,
      devtool: 'cheap-module-inline-source-map',
      mode: 'production',
      module: {
        rules: [{
          test: /\.js$/,
          include: $.path.join(__dirname, 'src'),
          loader: 'babel$presets[]=es2015'
        }]
      },
      plugins: [
        new $.webpack.NoEmitOnErrorsPlugin()
      ]
    };

    return $.gulp.src(['src/pages/**/*.js', 'src/static/js/*.js'])
      .pipe($.gp.plumber({
        errorHandler: $.gp.notify.onError(err => ({
          title: 'Webpack',
          message: err.message
        }))
      }))
      .pipe($.named())
      .pipe($.webpackStream(options, null, done))
      .pipe($.gp.uglify())
      .pipe($.gp.flatten())
      .pipe($.gulp.dest('dist/assets/js/'))
      .on('data', function() {
        if (firstBuildReady) {
          callback();
        }
      });
  });
};