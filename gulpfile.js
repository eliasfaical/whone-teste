/*!
 * install task gulp
 * $ npm install -g browser-sync
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano      = require('gulp-cssnano'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    livereload   = require('gulp-livereload'),
    del          = require('del'),
    browserSync  = require('browser-sync').create(); // create a browser sync instance.

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

/* Styles
--------------------------------------------------------------------------- */
gulp.task('styles', function() {
  return sass('assets/scss/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({ message: 'Styles task complete' }));
});


/* Scripts
--------------------------------------------------------------------------- */
var js = [
  './assets/components/jquery/dist/jquery.min.js',
  './assets/components/bootstrap-4.0.0-alpha.6/dist/js/bootstrap.min.js'
  // './assets/js/scripts.js'
];

gulp.task('scripts', function() {
  return gulp.src(js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js/min'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/min'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


/* Images
--------------------------------------------------------------------------- */
gulp.task('images', function() {
  return gulp.src('assets/image/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/image'))
    .pipe(notify({ message: 'Images task complete' }));
});


/* Clean
--------------------------------------------------------------------------- */
gulp.task('clean', function() {
  return del(['assets/scss', 'assets/js', 'assets/image']);
});


/* Default task
--------------------------------------------------------------------------- */
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});


/* Watch
--------------------------------------------------------------------------- */
gulp.task('watch', ['browser-sync'], function () {

  // Watch .scss files
  gulp.watch('assets/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('assets/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('assets/image/**/*', ['images']);

  // browserSync
  gulp.watch("*.html").on('change', browserSync.reload);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['assets/**']).on('change', livereload.changed);

});
