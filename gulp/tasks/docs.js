'use strict';
const gulp = require('gulp');
const size = require('gulp-size');

// 'gulp fonts' -- copies your fonts to the temporary assets directory
gulp.task('docs', () =>
  gulp.src('src/assets/docs/**/*')
    .pipe(gulp.dest('.tmp/assets/docs'))
    .pipe(size({title: 'docs'}))
);
