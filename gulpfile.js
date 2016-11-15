var gulp = require('gulp')
var fs = require('fs')
var notifier = require('node-notifier')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var bundler = browserify({
  entries: ['./src/js/App.jsx'],
  cache: {},
  packageCache: {},
  extensions: ['.jsx'],
  plugin: [watchify]
})

function notify(error) {
  console.log(error.message)
  var fileName = error.message.match(/[^/]+$/)
  notifier.notify({title: fileName, message: error.description})
}

function bundle() {
  bundler.bundle()
    .on('error', notify)
    .pipe(fs.createWriteStream('./build/pwEnhanced.js'))
}

function copyContentToBuild() {
  gulp.src(['node_modules/semantic-ui-css/semantic.min.css', 'src/**/*', '!src/js/{,**}']).pipe(gulp.dest('build'))
}

gulp.task('bundle', function() {
  bundle()
})

gulp.task('build', function() {
  copyContentToBuild()
})

gulp.task('deployBuild', ['build', 'bundle'])
gulp.task('dev', ['build', 'bundle'], function() {
  bundler.on('update', bundle)
})
gulp.task('default', ['dev'])
