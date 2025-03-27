import React, { useState } from "react";
import axios from "axios";
import "../styles/BrightnessAdjustment.css";

const BrightnessContrast = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [brightness, setBrightness] = useState(1.2); // Default brightness
  const [contrast, setContrast] = useState(1.1); // Default contrast

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result); // Preview the original image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessAdjustment = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("brightness", brightness);
    formData.append("contrast", contrast);

    // Debug logging for keys
    formData.forEach((value, key) => console.log(key, value));

    try {
      const response = await axios.post("http://localhost:5000/brightness", formData, {
        responseType: "blob", // Expect binary image data
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error applying brightness and contrast:", error);
        }
  };

  return (
    <div className="brightness-contrast-container">
      <h2>Brightness & Contrast Adjustment</h2>
      <div className="image-preview-container">
        {originalImage && (
          <div className="image-preview">
            <h3>Original Image</h3>
            <img src={originalImage} alt="Original" className="image" />
          </div>
        )}
        {processedImage && (
          <div className="image-preview">
            <h3>Processed Image</h3>
            <img src={processedImage} alt="Processed" className="image" />
          </div>
        )}
      </div>
      <div className="controls">
        <input type="file" onChange={handleFileUpload} accept="image/*" />
        <div className="adjustments">
          <label>
            Brightness:
            <input
              type="number"
              step="0.1"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />
          </label>
          <label>
            Contrast:
            <input
              type="number"
              step="0.1"
              value={contrast}
              onChange={(e) => setContrast(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleProcessAdjustment} className="process-button">Process</button>
      </div>
    </div>
  );
};

export default BrightnessContrast;
