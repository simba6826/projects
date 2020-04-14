module.exports = function () {
    function devCompile(url) {
        return $.gulp.src(url)
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass({
                includePaths: [
                    require('node-normalize-scss').includePaths
                ]
            }))
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Sass',
                    message: error.message
                };
            }))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gp.flatten())
            .pipe($.gulp.dest('./dist/assets/css/'));
    }

    $.gulp.task('styles:pages:src', () => {
        return devCompile('src/pages/**/*.scss');
    });

    $.gulp.task('styles:common:src', () => {
        return devCompile('src/static/styles/*.scss');
    });

    $.gulp.task('styles:src', () => {
        return devCompile(['src/pages/**/*.scss', 'src/static/styles/*.scss']);
    });

    $.gulp.task('styles:src:pages:stream', () => {
        return devCompile('src/pages/**/*.scss')
            .pipe($.browserSync.reload({stream: true}));
    });

    $.gulp.task('styles:src:common:stream', () => {
        return devCompile('src/static/styles/*.scss')
            .pipe($.browserSync.reload({stream: true}));
    });

    $.gulp.task('styles:src:stream', () => {
        return devCompile(['src/pages/**/*.scss', 'src/static/styles/*.scss'])
            .pipe($.browserSync.reload({stream: true}));
    });

    function buildCompile(path) {
        return $.gulp.src(path)
            .pipe($.gp.sass({
                includePaths: [
                    require('node-normalize-scss').includePaths
                ]
            }))
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.gp.flatten())
            .pipe($.gulp.dest('./dist/assets/css/'));
    }

    $.gulp.task('styles:dist', () => {
        return devCompile(['src/pages/**/*.scss', 'src/static/styles/*.scss']);
    }); 
};
