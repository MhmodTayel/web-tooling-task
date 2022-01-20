const { src, dest, watch, parallel, series } = require("gulp");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const jsmin = require("gulp-jsmin");
const cssmin = require("gulp-cssmin");
// const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const  useref = require("gulp-useref");
const modifyHTMLlinks = require("gulp-processhtml");

function htmlTask() {
  return src("project/*.html")
    .pipe(modifyHTMLlinks())
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist"));
}

exports.html = htmlTask;

function cssTask() {
  return src("project/css/**/*.css")
    .pipe(concat("style.min.css"))
    .pipe(cssmin())
    .pipe(dest("dist/assets/css"));
}
exports.css = cssTask;

// function sassTask() {
//   return src(["project/sass/**/*.scss", "project/css/**/*.css"])
//     .pipe(sass())
//     .pipe(concat("style.sass.min.css"))
//     .pipe(cssmin())
//     .pipe(dest("dist/assets/css"));
// }

// exports.sass = sassTask;

function imgTask() {
  return src("project/pics/*").pipe(imagemin()).pipe(dest("dist/images"));
}
exports.img = imgTask;

function jsTask() {
  return src("project/js/**/*.js")
    .pipe(concat("all.min.js"))
    .pipe(jsmin())
    .pipe(dest("dist/assets/js"));
}
exports.js = jsTask;


function serve(cb) {
  browserSync({
    server: {
      baseDir: "dist/",
    },
  });
  cb();
}

function reloadTask(done) {
  browserSync.reload();
  done();
}

function watchTask() {
  watch("project/*.html", series(htmlTask, reloadTask));
  watch("project/js/**/*.js", series(jsTask, reloadTask));
  watch(
    ["project/css/**/*.css", "project/sass/**/*.scss"],
    parallel(cssTask, reloadTask)
  );
}
exports.default = series(
  parallel(imgTask, jsTask, cssTask, htmlTask),
  serve,
  watchTask
);
