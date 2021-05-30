const gulp = require("gulp");

class Copier {
  constructor() {}
  html() {
    return gulp.src("app/html/**/*.html").pipe(gulp.dest("public"));
  }
  htmlProd() {
    return gulp.src("app/html/**/*.html").pipe(gulp.dest("dist"));
  }
}

module.exports = Copier;
