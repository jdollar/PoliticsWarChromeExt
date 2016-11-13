var gulp = require('gulp')
var fs = require('fs')
var browserify = require('browserify')
var watchify = require('watchify')
var reactify = require('reactify')

var bundler = browserify({
  entries: ['./src/js/App.jsx'],
  cache: {},
  packageCache: {},
  extensions: ['.jsx'],
  plugin: [watchify]
})

function bundle() {
  bundler.bundle()
    .on('error', function(error) { console.log(error.message); console.log(error.description)})
    .pipe(fs.createWriteStream('./build/pwEnhanced.js'))
}

function copyContentToBuild() {
  gulp.src(['src/**/*', '!src/js']).pipe(gulp.dest('build'))
}

gulp.task('bundle', function() {
  bundle();
})
gulp.task('build', function() {
  copyContentToBuild()
})

gulp.task('deployBuild', ['build', 'bundle'])
gulp.task('dev', ['build', 'bundle'], function() {
  bundler.on('update', bundle);
})
gulp.task('default', ['dev']);
