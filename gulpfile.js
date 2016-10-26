(function () {

    'use strict';

    var gulp       = require('gulp'),
        gutil      = require('gulp-util'),
        source     = require('vinyl-source-stream'),
        browserify = require('browserify'),
        less       = require('gulp-less'),
        cssmin     = require('gulp-clean-css'),
        concat     = require('gulp-concat'),
        ngFix      = require('gulp-ng-annotate'),
        del        = require('del'),
        uglify     = require('gulp-uglify'),
        rename     = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps'),
        Karma      = require('karma').Server;


    gulp.task('default', function() {
        gutil.log('Speak friend, and enter.');
        gutil.log('');
        gutil.log('    clean -- remove generated files');
        gutil.log('    serve -- repack bundle.js on edit');
        gutil.log('    watch -- repack bundle.js on edit');
        gutil.log('    pack  -- pack bundle.js for development');
        gutil.log('    build -- pack bundle.js for production');
        gutil.log('    test  -- run karma unit tests');
        gutil.log('');
    });

    function logError(e) {gutil.log('--- error ---');gutil.log(e);}

    gulp.task('clean', function(cb) {
        del([
            'public/styles/bundle.css',
            'public/js/*bundle.js.map',
            'public/js/*bundle.js'
        ]);
        cb();
    });

    gulp.task('partial-clean', function(cb) {
        del([
            'public/styles/bundle.css',
            'public/js/bundle.js'
        ]);
        cb();
    });

    gulp.task('pre-components',['clean'], function() {
        return browserify('public/js/pre-components.js')
        .bundle().on('error',logError)
        .pipe(source('pre-components.bundle.js'))
        .pipe(gulp.dest('public/js'));
    });

    gulp.task('post-components', ['pre-components'], function() {
        return browserify('public/js/post-components.js')
        .bundle().on('error',logError)
        .pipe(source('post-components.bundle.js'))
        .pipe(gulp.dest('public/js'));
    });

    gulp.task('components', ['post-components'], function() {
        return concatComponents();
    });

    function concatComponents() {
        return gulp.src(['public/js/pre-components.bundle.js','public/js/post-components.bundle.js'])
        .pipe(concat('components.bundle.js'))
        .pipe(gulp.dest('public/js'));
    }

    // Can remove this code duplication when gulp 4.0 is released
    function concatJs() {
        return gulp.src([
            'public/js/components.bundle.js',
            'public/js/app.js',
            'public/js/**/*.bootstrap.js',
            'public/js/**/!(*components)*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
    }

    gulp.task('less', ['partial-clean'], function() {
        return gulp.src('public/styles/style.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('public/styles/'));
    });

    gulp.task('first-pack', ['components','less'], function() {
        return concatJs();
    });

    gulp.task('pack', ['first-pack']);

    gulp.task('dev-pack', ['less'], function() {
        return concatJs();
    });

    gulp.task('serve',['watch']);

    gulp.task('watch',['first-pack'], function() {
        gulp.watch([
            'public/styles/**/*.less',
            'public/js/**/*',
            // -- ignore --
            '!public/js/*bundle.js'
        ],['dev-pack']);
    });

    gulp.task('build', ['first-pack'], function() {
        gulp.src('public/js/bundle.js')
            .pipe(ngFix())
            .pipe(uglify())
            .pipe(gulp.dest('public/js'));
    });

    gulp.task('test', ['first-pack'], function (finished) {
        new Karma({
            configFile: __dirname+'/karma.conf.js',
            singleRun: true
        }, finished).start();
    });

}());
