const path = require('path');
const gulp = require('gulp');
// const less = require('gulp-less');
const stylus = require('gulp-stylus');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const cssmin = require('gulp-clean-css');
const postcss = require('gulp-postcss');

const src = path.join(__dirname, '../packages');
const dist = path.join(__dirname, '../examples/dist');
const ext = ['js', 'stylus', 'json', 'wxml'];

function copy(ext) {
  return gulp.src([src + '/**/*.' + ext]).pipe(gulp.dest(dist));
}

gulp.task('compile-stylus', () => {
  return gulp
    .src([src + '/**/*.stylus'])
    .pipe(stylus())
    // .pipe(postcss())
    // .pipe(cssmin())
    .pipe(
      rename(path => {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest(dist));
});

gulp.task('compile-js', () =>
  gulp
    .src([src + '/**/*.js'])
    .pipe(babel())
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest(dist))
);

gulp.task('compile-json', () => copy('json'));
gulp.task('compile-wxml', () => copy('wxml'));
gulp.task('build', ext.map(ext => 'compile-' + ext));
gulp.start('build');

ext.forEach(ext => {
  gulp.watch(src + '/**/*.' + ext, ['compile-' + ext]);
});
