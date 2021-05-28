const gulp = require("gulp"),
  bs = require("browser-sync").create(),
  { exec } = require("child_process");
class Server {
  constructor() {}
  start(cb) {
    bs.init({
      proxy: "localhost",
    });
    cb();
  }
  proxy() {
    exec("node server.js --local", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      cb();
    });
  }
  reload(cb) {
    bs.reload();
    cb();
  }
}

module.exports = Server;
