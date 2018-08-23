'use strict';
const gulp = require('gulp');
const pandocWriter = require('gulp-pandoc-writer');

gulp.task('pandoc', () =>
    gulp.src('src/my_collections/_posts/**/*.md')
        .pipe(pandocWriter({
            outputDir: 'src/assets/docs',
            inputFileType:'.md',
            outputFileType: '.epub',
            args: [
                '--smart'
            ]
        }))
        .pipe(gulp.dest('src/assets/docs'))
);

// var path = require('path');
// const shell = require('gulp-shell')
// const foreach = require('gulp-foreach');
//
// gulp.task('pandoc', function() {
//   return gulp.src('dist/docs/*.md')
//     .pipe(foreach(function(stream, file) {
//       var name_wo_ext = path.basename(file.path, '.md');
//       return stream
//         .pipe(
//           shell([
//           'echo cd dist/docs',
//           'echo pandoc -s -o ' + name_wo_ext + '.pdf ' + name_wo_ext + '.md ' + '',
//          'echo cd ../../../src'
//         ]))
//     }))
//     .pipe(gulp.dest('dist/docs'))
// });
