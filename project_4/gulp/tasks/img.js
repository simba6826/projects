module.exports = function() {
    $.gulp.task('img:src', () => {
        return $.gulp.src(['./src/static/img/**/*.{png,jpg,gif,svg}', '!./src/static/img/svg/**/*'])
            .pipe($.gulp.dest('./dist/assets/img/'));
    });

    // TODO: build version of img task
};
