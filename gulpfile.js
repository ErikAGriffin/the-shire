(function () {

    'use strict';

    var gulp       = require('gulp'),
        gutil      = require('gulp-util'),
        source     = require('vinyl-source-stream'),
        buffer     = require('vinyl-buffer'),
        browserify = require('browserify'),
        concat     = require('gulp-concat'),
        ngFix      = require('gulp-ng-annotate'),
        del        = require('del'),
        uglify     = require('gulp-uglify');


    gulp.task('default', function() {
        gutil.log('Speak friend, and enter.');
        gutil.log('');
        gutil.log('    clean -- remove generated files');
        gutil.log('    watch -- repack bundle.js on edit');
        gutil.log('    pack  -- pack bundle.js for development');
        gutil.log('    build -- pack bundle.js for production');
        gutil.log('');
    });

    function logError(e) {gutil.log('--- error ---');gutil.log(e);}

    gulp.task('clean', function() {
        return del([
            'public/js/bundle.js',
            'public/js/temp.js'
        ]);
    });

    gulp.task('concat', ['clean'], function() {
        return gulp.src(['public/js/app.js','public/js/**/*.bootstrap.js','public/js/**/*.js'])
            .pipe(concat('temp.js'))
            .pipe(gulp.dest('public/js'));
    });

    gulp.task('watch',['pack'], function() {
        gulp.watch([
            'public/js/**/*',
            // -- ignore --
            '!public/js/temp.js',
            '!public/js/bundle.js'
        ],['pack']);
    });

    gulp.task('browserify', ['concat'], function() {
        return browserify('public/js/temp.js')
            .bundle().on('error',logError)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('public/js'));
    });

    // I'm not a fan of having this 'ghost' pack
    // task just to remove the concatenated file.
    // There should be a way to just pass the stream
    // of the concatted file to browserify
    gulp.task('pack',['browserify'], function() {
        return del('public/js/temp.js');
    });

    gulp.task('build', ['pack'], function() {
        gulp.src('public/js/bundle.js')
            .pipe(ngFix())
            .pipe(uglify())
            .pipe(gulp.dest('public/js'));
    });

}());
