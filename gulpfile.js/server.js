const gulp = require("gulp"),
  bs = require("browser-sync").create();
class Server {
  constructor() {}
  start(cb) {
    bs.init({
      server: {
        baseDir: "./public",
      },
    });
    cb();
  }
  reload(cb) {
    bs.reload();
    cb();
  }
}

module.exports = Server;
