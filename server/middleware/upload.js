import multer from "multer";
import { dirname, join } from "path";
const currentFile = import.meta.url;
const currentDir = dirname(currentFile);

// const storage = multer.diskStorage({
//   destination: "../uploads",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      console.log("all good, files will be uploaded");
      cb(null, true);
    } else {
      console.log("please upload either a jpg, jpeg or png");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 1, //the 1 means a max of 1mb file
  },
});

export default upload;
