var gulp = require('gulp'),
  connect = require('gulp-connect'),
  htmlmin = require('gulp-htmlmin'),
  sync = require('run-sequence'),
  concat = require('gulp-concat'),
  cssnano = require('cssnano'),
  autoprefixer = require('autoprefixer'),
  imagemin = require('gulp-imagemin'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');;
 
var paths = {
  source: {
    html: ['./**/*.html', '!node_modules/**/*', '!dist/**/*'],
    css: './assets/css/**/*.css',
    js : './assets/js/**/*.js',
    images: './assets/images/**/*',
    meta: ['./browserconfig.xml', './manifest.json']
  },
  dest: {
    base: './dist/',
    css: './dist/assets/css',
    js: './dist/assets/js',
    images: './dist/assets/images',
    maps: '../maps'
  }
};


gulp.task('webserver', function() {
  connect.server({
    port: 9000,
    host: 'castle-black'
  });
});

 
gulp.task('html', function(){
  gulp.src(paths.source.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dest.base));
});


gulp.task('styles', function(){
  var processors = [
      autoprefixer({browsers: ['last 2 versions']}),
      cssnano()
  ];

  gulp.src(paths.source.css)
      .pipe(concat('main.css'))
      .pipe(postcss(processors))
      .pipe(gulp.dest(paths.dest.css));
});


gulp.task('scripts', function(){
  gulp.src(paths.source.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(paths.dest.maps))
    .pipe(gulp.dest(paths.dest.js));
});


gulp.task('images', function(){
  gulp.src(paths.source.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest.images));
});


gulp.task('meta', function(){
  gulp.src(paths.source.meta)
    .pipe(gulp.dest(paths.dest.base));
});


gulp.task('build', ['html', 'styles', 'scripts', 'images', 'meta']);

gulp.task('default', ['webserver']);
