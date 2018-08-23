'use strict';
const gulp = require('gulp');
const pdf = require('gulp-pandoc-pdf');

gulp.task('pdf', () =>
    gulp.src('src/my_collections/_posts/**/*.md')
        .pipe(pdf({
            pdfDir: 'src/assets/docs'
        }))
        .pipe(gulp.dest('src/assets/docs'))
);
