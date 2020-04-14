module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch(
          [
            './src/pages/**/*.pug',
            './src/static/layouts/**/*.pug',
            './src/components/**/*.pug'
          ],
          $.gulp.series(
            $.gulp.parallel('pug'),
            $.reload
          )
        );

        $.gulp.watch(
          './src/static/styles/*.scss',
          $.gulp.series(
            $.gulp.parallel('styles:src:common:stream')
          )
        );

        $.gulp.watch(
          './src/pages/**/*.scss',
          $.gulp.series(
            $.gulp.parallel('styles:src:pages:stream')
          )
        );

        $.gulp.watch(
          ['./src/components/**/*.scss', './src/static/styles/includes/*.scss'],
          $.gulp.series(
            $.gulp.parallel('styles:src:stream')
          )
        );

        $.gulp.watch(
          './src/static/js/**/*.js',
          $.gulp.parallel('scripts:common')
        );

        $.gulp.watch(
          './src/pages/**/*.js',
          $.gulp.parallel('scripts:pages')
        );

        $.gulp.watch(
          [
            './src/assets/img/general/**/*.{png,jpg,gif}',
            './src/assets/img/content/**/*.{png,jpg,gif}'
          ],
          $.gulp.parallel('img:src')
        );

        $.gulp.watch(
          [
            './src/assets/img/general/**/*.svg',
            './src/assets/img/content/**/*.svg'
          ],
          $.gulp.parallel('svg')
        );
    });
};
