const DB = require("./db"),
  express = require("express"),
  fileUpload = require("express-fileupload"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  parse = require("csv-parse/lib/sync");
(app = express()), (port = 80);

let isLocal =
  process.argv.slice(2).length > 0 && process.argv.slice(2)[0] == "--local"
    ? true
    : false;
let db = new DB();
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
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
        let departmentRecord = await db._createOrFind("department", {
          name: record.department,
        });
        record.department = departmentRecord[0].id;
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
db.init().then(() => {
  app.listen(port, () => {});
});
