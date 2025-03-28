import React, { useState } from "react";
import axios from "axios";
import "../styles/BackgroundFeature.css";

const BackgroundFeature = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result); // Preview the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundRemoval = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedFile);
  
    console.log("Attempting to send:", selectedFile); // Debugging log
  
    try {
      const response = await axios.post("http://localhost:5000/background", formData, {
        responseType: "blob",
      });
      console.log("Backend response:", response); // Debugging log
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error removing background:", error.response || error.message);
      alert("Background removal failed. Check the console for details.");
    }
  };
  
  const handleDownloadProcessedImage = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = "background_removed_image.jpg";
      link.click();
    } else {
      alert("No processed image available to download!");
    }
  };

  return (
    <div className="background-feature-container">
      <h2>Background Removal</h2>
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
        <button onClick={handleBackgroundRemoval} className="process-button">Process</button>
      </div>
      {processedImage && (
        <div className="dbutton">
          <button onClick={handleDownloadProcessedImage} className="download-button">
            Download Processed Image
          </button>
        </div>
      )}
    </div>
  );
};

export default BackgroundFeature;
