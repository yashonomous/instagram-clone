import multer, { diskStorage, MulterError } from "multer";

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      console.log("Only .png, .jpg and .jpeg formats allowed!!!");
      return cb(
        new MulterError("Only .png, .jpg and .jpeg formats allowed!!!")
      );
    }
  },
});

export default upload;
