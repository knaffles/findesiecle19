"use strict";

/************************
 * SETUP
 ************************/

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

/************************
 * CONFIGURATION
 ************************/

var autoReload = true;

var includePaths = [
  require('node-normalize-scss').includePaths,
  './node_modules/breakpoint-sass/stylesheets'
]

var stylesSrc = [
  './css/fonts.css',
  './css/magnific-popup.css',
  './css/slick.css',
  './css/slick-theme.css',
  './sass/styles.scss'
];

/************************
 * TASKS
 ************************/

gulp.task('styles', function() {
  gulp.src(stylesSrc)
    .pipe(sass({
      includePaths: includePaths,
      outputStyle: 'expanded',
      sourceComments: true
    }))
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS 7', 'ie 11']
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('wufoo', function() {
  gulp.src('./sass/wufoo.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: true
    }))
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS 7', 'ie 11']
    }))
    .pipe(concat('wufoo.css'))
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  if (autoReload) {
    livereload.listen();
  }
  gulp.watch('./sass/**/*.scss', ['styles', 'wufoo']);
});

gulp.task('default', ['styles', 'wufoo']);
