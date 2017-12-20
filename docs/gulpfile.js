var gulp = require('gulp'),
    rename = require('gulp-rename'),
    webpackStream = require('webpack-stream'),
    webpack = require('webpack'),
    twigConfig = require('./twig-config'),
    webpackConfig = require('./webpack.config.js'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');

var partials = ['./app/views/**/_*.twig'];
var pages = ['./app/views/**/[^_]*.twig'];
var scssFiles = ['./app/scss/**/*.scss'];
var jsFiles = ['./app/js/**/*.js'];
var srcFiles = [scssFiles, jsFiles];
var assets = ['./app/assets/**/*'];
var watch = false;

var handleError = function () {
    this.emit('end');
};

gulp.task('webserver', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('twig', function () {
    'use strict';
    var twig = require('gulp-twig');

    gulp.src(pages)
        .pipe(twig({
            data: twigConfig
        }))
        .on('error', handleError)
        .pipe(rename(function (path) {
            if(path.dirname != '.') {
                path.basename = path.dirname.replace('/', '.') + '.' + path.basename;
            }
            path.dirname = '/';
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('twig-partials', function () {
    'use strict';
    var twig = require('gulp-twig');

    return gulp.src(partials)
        .pipe(twig())
        .on('error', handleError)
        .pipe(rename(function (path) {
            if(path.dirname == 'partials') {
                path.dirname = '/';
            }
        }))
        .pipe(gulp.dest('./build/partials'))
        .pipe(connect.reload());
});

gulp.task('webpack', function () {
    if(watch) {
        webpackConfig.watch = true;
    }

    return gulp.src(jsFiles)
        .pipe(webpackStream(webpackConfig, webpack))
        .on('error', handleError)
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('assets', function() {
    gulp.src(assets).pipe(gulp.dest('build/assets'));
});

gulp.task('clean-build', function () {
    return gulp.src('./build').pipe(clean());
});

gulp.task('watch', ['assets', 'twig', 'webpack'], function () {
    gulp.watch([pages], ['twig']);
//     gulp.watch([partials], ['twig-partials', 'twig']);
    gulp.watch([srcFiles], ['webpack']);
});

gulp.task('default', ['webserver', 'watch']);

gulp.task('build', function (cb) {
    runSequence('clean-build', ['assets', 'twig', 'webpack'], cb);
});
