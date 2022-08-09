import express from "express";
import cors from "cors";
import upload from "./upload.js";
import { MulterError } from "multer";

const app = express();

//Add the client URL to the CORS policy
const whitelist = [
  "http://localhost:3000",
  "https://freeimage.host/api/1/upload",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// app.get();

app.post("/upload_file", upload.single("file"), (req, res) => {
  //   console.log(req);
  if (!req.file) throw Error("FILE_MISSING");
  else res.send({ status: "success", filePath: req.file });
});

//Express Error Handling
app.use((err, req, res, next) => {
  if (err instanceof MulterError) {
    res.statusCode = 400;
    res.send({ code: err.code });
  } else if (err) {
    if (err.message === "FILE_MISSING") {
      res.statusCode = 400;
      res.send({ code: "FILE_MISSING" });
    } else {
      res.statusCode = 500;
      res.send({ code: "GENERIC_ERROR" });
    }
  }
});

const server = app.listen(8081, () => {
  const port = server.address().port;

  console.log("App started at http://localhost:%s", port);
});
