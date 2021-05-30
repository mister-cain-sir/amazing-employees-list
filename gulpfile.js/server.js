const gulp = require("gulp"),
  bs = require("browser-sync").create(),
  { exec } = require("child_process");

let process = null,
  prevcb = null;
class Server {
  constructor() {
    this.process = null;
  }
  start(cb) {
    bs.init({
      proxy: "localhost",
    });
    cb();
  }
  proxy(cb) {
    if (process != null) {
      console.log("Restarting Server");
      process.kill("SIGTERM");
      process = null;
      prevcb = cb;
    }
    process = exec("node server.js --local");
    process.stdout.on("data", function (res) {
      console.log(res);
    });
    process.on("close", (code) => {
      if (prevcb != null) {
        prevcb();
      }
    });
  }
  reload(cb) {
    bs.reload();
    cb();
  }
}

module.exports = Server;
