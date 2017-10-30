// var gulp = require('gulp');
// var babel = require('gulp-babel');
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
// var uglify = require('gulp-uglify');
// var gutil = require('gulp-util');

// gulp.task('default', function () {
//   // set up the browserify instance on a task basis
//   var b = browserify({
//     entries: './src/index.js',
//     debug: true
//   });

//   return b.bundle()
//     .pipe(source('index.js'))
//     .pipe(buffer())
//     .pipe(babel({ presets: ['env'] }))
//     // .pipe(uglify())
//     // .on('error', gutil.log)
//     .pipe(gulp.dest('./build/'));
// });

const gulp = require('gulp');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');

gulp.task('default', () => {
  gulp.src('./src/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest('./build/'));
  }
);