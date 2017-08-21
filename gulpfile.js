const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const runSequence = require('run-sequence');
const sprite = require('gulp-svgsprite');
const replace = require('gulp-replace');

const stylefmt = require('gulp-stylefmt');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');


const path = {
  source: {
    blocks: 'source/blocks',
    scss: ['source/blocks/**/**/*.scss', 'source/fonts.scss'],
    js: 'source/blocks/**/**/*.js',
    pug: 'source/pages/*.pug',
    svgsprite: 'source/svg-sprite'
  },
  dist: {
    dist: 'dist',
    styles: 'dist/styles',
    js: 'dist/js',
    images: 'dist/images'
  },
  static: {
    static: 'static/**/*',
    svg: 'static/images/svg/*.svg',
    images: 'static/images/**'
  }
};

gulp.task('sass-to-css', () => gulp.src(path.source.scss)
  .pipe(sass())
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(path.dist.styles)));


gulp.task('concat-js', () => gulp.src(path.source.js)
  .pipe(concat('script.js'))
  .pipe(gulp.dest(path.dist.js)));

gulp.task('pug', () => gulp.src(path.source.pug)
  .pipe(pug({}))
  .pipe(gulp.dest(path.dist.dist)));

gulp.task('copy', () => gulp
  .src(path.static.static)
  .pipe(gulp.dest(path.dist.dist)));

gulp.task('sprite', () => gulp.src(path.static.svg)
  .pipe(replace('&gt;', '>'))
  .pipe(sprite({
    inlineSvg: true
    , preview: false
    , mode: "symbols"
    , metaAttrs: ["width", "height", "fill"]
    , cleanAttrs: ["fill", "style"]
  }))
  .pipe(gulp.dest(path.source.svgsprite)));


gulp.task('minify-js', () => gulp.src(path.dist.js + '/*')
  .pipe(uglify({mangle: true}))
  .pipe(gulp.dest(path.dist.js)));

gulp.task('stylefmt', () => gulp.src(path.source.scss)
  .pipe(stylefmt())
  .pipe(gulp.dest(path.source.blocks)));

gulp.task('minify-css', () => gulp.src(path.dist.styles + '/*')
  .pipe(cleanCSS())
  .pipe(gulp.dest(path.dist.styles)));

gulp.task('imagemin', () =>
  gulp.src(path.static.images)
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.images))
);


gulp.task('dev', () => {
  runSequence('sass-to-css', 'sprite', 'pug', 'concat-js', 'copy');
});

gulp.task('prod', () => {
  runSequence('minify-js', 'stylefmt', 'minify-css', 'imagemin');
});


gulp.watch(['./source/**/*.*', './static/**/*.*']);
