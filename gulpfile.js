'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var htmlInjector = require("bs-html-injector");
var reload = browserSync.reload;

gulp.task('styles', function () {
  return gulp.src('src/assets/sass/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream: true}));
});



gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', './src/app', '.']});

  return gulp.src('src/*.html')
    .pipe(assets)
    //.pipe($.if('*.js', $.uglify()))
    //.pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['styles'], function() {
  browserSync.use(htmlInjector, {});
  browserSync({
    notify: false,
    server: {
      baseDir: ['.tmp', 'src'],
      routes: {
        '/node_modules':'node_modules'
      }
    }
  });

  gulp.watch([
    'src/app/**/*.js',
  ]).on('change', reload);

  gulp.watch([
    'src/index.html',
    'src/app/**/*.html'
  ], htmlInjector);

  gulp.watch('src/assets/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['serve']);
