var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');

var paths = {
    sass: ['./scss/**/*.scss'],
    js: ['./www/js/**/*.js'],
    bower: ['./bower_components/**/*.min.js']
};

gulp.task('default', ['sass', 'js']);

gulp.task('sass', function(done) {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('./www/build/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/build/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.start('deps');
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('js', function() {
        gulp.src(paths.js)
//            .pipe(ngmin())
//            .pipe(uglify())
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./www/build/js/'));
});

gulp.task('deps', function() {
    gulp.src(paths.bower)
        .pipe(gulp.dest('./www/build/lib/'));
});