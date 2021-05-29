const gulp = require("gulp"),
  server = new (require("./server"))(),
  copy = new (require("./copy"))(),
  scripts = new (require("./scripts"))(),
  tester = new (require("./test"))();

function watchHtml() {
  gulp.watch("app/html/**/*.html", gulp.series(copy.html, server.reload));
}
function watchScripts() {
  gulp.watch(
    "app/scripts/**/*.*",
    gulp.series(gulp.series(tester.test, scripts.buildLocal, server.reload))
  );
}

function watchStyles() {
  gulp.watch(
    "app/styles/**/*.*",
    gulp.series(scripts.buildLocal, server.reload)
  );
}

function watchServerFiles() {
  gulp.watch("*.js", server.proxy);
}

exports.default = gulp.series(
  copy.html,
  tester.test,
  scripts.buildLocal,
  gulp.parallel(
    gulp.parallel(watchHtml, watchScripts, watchStyles, watchServerFiles),
    server.start,
    server.proxy
  )
);

exports.build = gulp.series(tester.test, copy.htmlProd, scripts.buildProd);
