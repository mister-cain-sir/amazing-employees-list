const DB = require("./db"),
  express = require("express"),
  fileUpload = require("express-fileupload"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  parse = require("csv-parse/lib/sync"),
  JSONHelper = require("./json-helper"),
  dayjs = require("dayjs");

let app = express(),
  port = 80;

let isLocal =
  process.argv.slice(2).length > 0 && process.argv.slice(2)[0] == "--local"
    ? true
    : false;
let db = new DB();
const helper = new JSONHelper(db);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("etag", false);
app.use(
  "/",
  express.static(+isLocal ? __dirname + "/public" : __dirname + "/dist")
);
app.post("/upload-data", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let file = req.files.dataupload;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      let parsedData = parse(file.data.toString("utf8"), {
        columns: true,
        skip_empty_lines: true,
      });
      for (let i = 0; i < parsedData.length; i++) {
        const record = parsedData[i];
        // let departmentRecord = await db._createOrFind("department", {
        //   name: record.department,
        // });
        // record.department = departmentRecord[0].id;
        record.age = dayjs().diff(record.dob, "year");
        console.log(record);
        await db._create("employee", record);
      }
      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: "test.csv",
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
app.delete("/api/json/reset", (req, res) => {
  db.dropDatabase().then(() => {
    res.send({
      status: true,
      message: "Database cleared",
      data: {},
    });
  });
});
app.get("/api/json/", (req, res) => {
  console.log(req.params);
  // if (req.params.limit) console.log(limit);
  helper.fetchEmployeeRecord().then((emp) => {
    res.send(JSON.stringify(emp));
  });
});
app.get("/api/json/list/:count?/:page?/:sortcol?/:sort?", (req, res) => {
  let { count, page, sort, sortcol } = req.params;
  let conf = {};
  if (count && count != "all") conf.limit = parseInt(count);
  if (page && parseInt(page) > 1) conf.offset = (parseInt(page) - 1) * count;
  if (sortcol) {
    if (sortcol == "employee") {
      if (sort) {
        conf.order = [["name", sort]];
      }
    } else {
      if (sort) {
        conf.order = [[sortcol, sort]];
      } else {
        conf.order = [[sortcol, "asc"]];
      }
    }
  }
  conf.conditionals = req.query;
  helper.fetchEmployeeRecord(conf, true).then((emp) => {
    res.send(JSON.stringify(emp));
  });
});
db.init().then(() => {
  app.listen(port, () => {});
});
