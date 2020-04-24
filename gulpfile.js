const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const terser = require("gulp-terser");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

// Minify and translate scss into css
function sassToCSS() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        // minify
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

// // Add different vendor prefixes
// function prefixifyCSS() {
//   return gulp
//     .src("dist/css/**/*.css")
//     .pipe(
//       autoprefixer({
//         cascade: false,
//       })
//     )
//     .pipe(gulp.dest("dist/css/prefixed"));
// }

// Compress JS code
function minifyES6() {
  return gulp.src("./js/**/*.js").pipe(terser()).pipe(gulp.dest("dist/js"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./scss/**/*.scss", sassToCSS);
  // gulp.watch("./css/**/*.css", prefixifyCSS);
  gulp.watch("./js/**/*.js", minifyES6);

  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./scss/**/*.scss").on("change", browserSync.reload);
  gulp.watch("./css/**/*.css").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.watch = watch;
exports.minifyES6 = minifyES6;
exports.sassToCSS = sassToCSS;
