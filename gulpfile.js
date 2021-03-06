var gulp        = require('gulp');
var cleanCSS    = require('gulp-clean-css');
var sequence    = require('gulp-sequence');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var babel = require('gulp-babel');
var babelPreset = require('babel-preset-es2015');
var pump = require('pump');


/**
 * Babel
 */

 gulp.task('_babel', function() {

  return gulp.src('./assets/js/*.js')
    .pipe(babel({
            presets: ['es2015']
    }))
    .pipe(gulp.dest('./assets/js/'));
 });

/**
 * Compress Javascript 
 */

 gulp.task('_compress', function (cb) {
    pump([
          gulp.src('./assets/js/*.js'),
          uglify(),
          gulp.dest('./builtAssets/js/'),
      ],
      cb
    );
});

/**
 * Styles Task
 *
 * Compile scss 
 */
gulp.task('_styles', function() {
  return gulp.src('./assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(cleanCSS({
      compatibility: 'ie9',
      debug: true,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./builtAssets/css/'))
});

gulp.task('_watch', function() {
          gulp.watch('./assets/js/*.js', ['_compress']),
          gulp.watch('./assets/scss/*.scss', ['_styles'])
});

/* -------------------- */

/**
 * Default Task
 *
 * Define the default task when running `gulp`.
 */
gulp.task('default', sequence('_styles', '_babel', '_compress','_watch'));
