const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, path.join(__dirname, "../images"));
    } else if (file.fieldname === "video") {
      cb(null, path.join(__dirname, "../uploads"));
    }
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (!file.mimetype.startsWith("image")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
  } else if (file.fieldname === "video") {
    if (!file.mimetype.startsWith("video")) {
      return cb(new Error("Only video files are allowed!"), false);
    }
  }
  cb(null, true);
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: (req, file) => {
      if (file.fieldname === "image") {
        return 2 * 1024 * 1024; // 2MB for images
      } else if (file.fieldname === "video") {
        return 50 * 1024 * 1024; // 50MB for videos
      }
    },
  },
});

module.exports = upload;
