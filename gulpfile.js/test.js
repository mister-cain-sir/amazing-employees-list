const gulp = require("gulp"),
  { exec } = require("child_process");

class Test {
  constructor() {}
  test(cb) {
    exec("npm test", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`${stdout}`);
      console.error(`${stderr}`);
      cb();
    });
  }
}

module.exports = Test;
