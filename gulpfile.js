const gulp=require('gulp');
const babel=require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', (done) =>{
  gulp.src('./dist/index.js')
      .pipe(babel({
        presets: ['@babel/env'],
      }))
      .pipe(uglify())
      .pipe(gulp.dest('lib'));
  done();
});
