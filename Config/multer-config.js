const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure multer storage
const storage = multer.memoryStorage({});

const upload = multer({ storage : storage });

module.exports = upload;