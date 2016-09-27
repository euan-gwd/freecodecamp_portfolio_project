const gulp = require('gulp'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber'),
  babel = require('gulp-babel');

// -----------------
// Development Tasks
// -----------------

// Compile Sass into CSS
gulp.task('styles', () => {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR')) //adds vendor prefixes if needed
    .pipe(gulp.dest('src/css')) // outputs CSS to src/css
    .pipe(reload({
      stream: true
    }));
});

// checks for errors in JS files
gulp.task('scripts', () => {
  return gulp.src('src/babel_js/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('src/js'))
    .pipe(reload({
      stream: true
    }));
});

// Starts browserSync server
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
    ui: false,
    port: 3000
  });
});

// Watches for file changes and reloads browsers
gulp.task('default', ['styles', 'scripts', 'browserSync'], () => {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/babel_js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.html', reload);
});
