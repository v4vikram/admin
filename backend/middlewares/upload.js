const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Helper to create folder if it doesn't exist
const createUploadPath = (folderPath) => {
  const fullPath = path.join(__dirname, "..", folderPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  return fullPath;
};

// Storage config with dynamic folder based on field name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads/products";

    // Choose sub-folder based on field name
    if (file.fieldname === "FeaturedImage") {
      folder += "/featured";
    } else if (file.fieldname === "featureImages") {
      folder += "/features";
    } else if (file.fieldname === "image") {
      folder += "/category";
    }

    const fullPath = createUploadPath(folder);
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now();
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// Optional file type filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Export multer instance
const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
