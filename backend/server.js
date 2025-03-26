const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Multer for image uploads
const upload = multer({ dest: "uploads/" });

// Blur Adjustment API
app.post("/api/blur", upload.single("image"), async (req, res) => {
  const filePath = req.file.path;
  const outputFilePath = `outputs/blurred-${Date.now()}.jpg`;

  try {
    await sharp(filePath).blur(5).toFile(outputFilePath); // Adjust blur level (5)
    res.download(outputFilePath, (err) => {
      if (err) throw err;
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputFilePath);
    });
  } catch (error) {
    res.status(500).json({ error: "Image processing failed." });
  }
});

// Brightness/Contrast Adjustment API
app.post("/api/brightness", upload.single("image"), async (req, res) => {
  const filePath = req.file.path;
  const outputFilePath = `outputs/brightness-${Date.now()}.jpg`;

  try {
    await sharp(filePath).modulate({ brightness: 1.2, contrast: 1.1 }).toFile(outputFilePath);
    res.download(outputFilePath, (err) => {
      if (err) throw err;
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputFilePath);
    });
  } catch (error) {
    res.status(500).json({ error: "Image processing failed." });
  }
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
