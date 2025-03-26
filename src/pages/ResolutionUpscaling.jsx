import React, { useState } from "react";
import axios from "axios";

const ResolutionFeature = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleResolutionUpscale = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/upscale", formData, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error upscaling resolution:", error);
    }
  };

  return (
    <div className="feature-container">
      <h2>Resolution Upscaling</h2>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleResolutionUpscale} className="futuristic-button">Upscale Resolution</button>
      {processedImage && <img src={processedImage} alt="Upscaled output" />}
    </div>
  );
};

export default ResolutionFeature;
