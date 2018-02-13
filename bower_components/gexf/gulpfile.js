var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    uglify = require('gulp-uglify'),
    mocha = require('gulp-mocha'),
    phantom = require('gulp-mocha-phantomjs'),
    seq = require('run-sequence'),
    pkg = require('./package.json');

var jsFiles = [
  './src/*.js'
];

// Linting
gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Building
var h = '/* gexf<%= sub %>.js - <%= description %> - Version: <%= version %> - Author: <%= author.name %> - medialab SciencesPo */\n';

gulp.task('build-parser', function() {
  return gulp.src('./src/parser.js')
    .pipe(concat('gexf-parser.min.js'))
    .pipe(uglify())
    .pipe(header(h, {
      sub: '-parser',
      description: 'Gexf parser for JavaScript.',
      version: pkg.version,
      author: pkg.author
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('build-writer', function() {
  return gulp.src('./src/writer.js')
    .pipe(concat('gexf-writer.min.js'))
    .pipe(uglify())
    .pipe(header(h, {
      sub: '-writer',
      description: 'Gexf writer for JavaScript.',
      version: pkg.version,
      author: pkg.author
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('build-all', function() {
  return gulp.src(jsFiles)
    .pipe(concat('gexf.min.js'))
    .pipe(uglify())
    .pipe(header(h, {
      sub: '',
      description: pkg.description,
      version: pkg.version,
      author: pkg.author
    }))
    .pipe(gulp.dest('./build'));
});

// Tests
gulp.task('node-test', function() {
  return gulp.src('./test/endpoint.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('browser-test', function() {
  return gulp.src('./test/browser/unit.html')
    .pipe(phantom({reporter: 'spec'}));
});

// Macro-task
gulp.task('test', function() {
  return seq('node-test', 'browser-test');
});

gulp.task('build', ['build-parser', 'build-writer', 'build-all']);

gulp.task('default', function() {
  return seq('lint', 'test', 'build');
});
