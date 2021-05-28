const DB = require("./db"),
  express = require("express"),
  app = express(),
  port = 80;

let isLocal =
  process.argv.slice(2).length > 0 && process.argv.slice(2)[0] == "--local"
    ? true
    : false;
let db = new DB();
app.use(
  "/",
  express.static(+isLocal ? __dirname + "/public" : __dirname + "/dist")
);
db.init().then(() => {
  app.listen(port, () => {});
});
