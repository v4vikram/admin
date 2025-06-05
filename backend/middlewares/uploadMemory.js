// uploadMemory.js
const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const uploadMemory = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 25 * 1024 * 1024,
    fieldSize: 25 * 1024 * 1024,
  },
});

module.exports = uploadMemory;
