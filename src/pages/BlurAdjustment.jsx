import React, { useState } from "react";
import axios from "axios";
import "../styles/BlurAdjustment.css";

const BlurAdjustment = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [blurredImage, setBlurredImage] = useState(null);

  // Handle file upload and preview
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

  // Handle the blur process
  const handleProcessBlur = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/blur", formData, {
        responseType: "blob", // Expect binary image data from the API
      });
      const imageUrl = URL.createObjectURL(response.data); // Convert blob to object URL
      setBlurredImage(imageUrl); // Set the processed blurred image
    } catch (error) {
      console.error("Error applying blur:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle image download
  const handleDownloadBlurredImage = () => {
    if (blurredImage) {
      const link = document.createElement("a");
      link.href = blurredImage;
      link.download = "blurred_image.jpg"; // Name of the downloaded file
      link.click();
    } else {
      alert("No processed image available to download!");
    }
  };

  return (
    <div className="blur-adjustment-container">
      <h2>Blur Adjustment</h2>
      <div className="image-preview-container">
        {originalImage && (
          <div className="image-preview">
            <h3>Original Image</h3>
            <img src={originalImage} alt="Original" className="image" />
          </div>
        )}
        {blurredImage && (
          <div className="image-preview">
            <h3>Blurred Image</h3>
            <img src={blurredImage} alt="Blurred" className="image" />
          </div>
        )}
      </div>
      <div className="controls">
        <input type="file" onChange={handleFileUpload} accept="image/*" />
        <button onClick={handleProcessBlur} className="process-button">Process</button>
      </div>
      <div className="dbutton">
      <button onClick={handleDownloadBlurredImage} className="download-button">
              Download Blurred Image
      </button>
      </div>
    </div>
  );
};

export default BlurAdjustment;
