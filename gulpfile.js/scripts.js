const gulp = require("gulp"),
  webpack = require("webpack"),
  gulpWebpack = require("webpack-stream"),
  webpackConfig = require("../webpack.config");

class Scripts {
  constructor() {}
  buildLocal() {
    webpackConfig.mode = "development";
    return gulp
      .src("app/scripts/*.tsx")
      .pipe(gulpWebpack(webpackConfig, webpack))
      .pipe(gulp.dest("public/scripts"));
  }
  buildProd() {
    webpackConfig.mode = "production";
    return gulp
      .src("app/scripts/*.tsx")
      .pipe(gulpWebpack(webpackConfig, webpack))
      .pipe(gulp.dest("dist/scripts"));
  }
}
module.exports = Scripts;
