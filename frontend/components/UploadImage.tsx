"use client";
import React, { useState } from "react";
import axios from "axios";

const UploadImageComponent = ({ onClose }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = React.createRef(); // Create a reference for the file input

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();

      // If an image file is selected, append it; otherwise, append the URL
      if (imageFile) {
        formData.append("file", imageFile);
        const response = await axios.post(
          "http://localhost:8000/upload_file/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setResult(response.data); // Update with the data returned from the API
      } else if (imageUrl) {
        const response = await axios.post(
          "http://localhost:8000/upload_url/",
          new URLSearchParams({ image_url: imageUrl })
        );
        setResult(response.data);
      } else {
        throw new Error("Please upload an image or provide a URL.");
      }
    } catch (err) {
      setError(err.response ? err.response.data.detail : err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 p-1 rounded hover:bg-gray-200"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Search any image with Google Lens
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {result && (
          <div className="text-green-500 mb-4">
            Search completed successfully!
          </div>
        )}
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <div className="mb-2">
            <span className="text-gray-400">Drag an image here or</span>
            <span
              className="text-blue-500 cursor-pointer ml-1 hover:underline"
              onClick={triggerFileUpload} // Trigger file upload when clicked
            >
              upload a file
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload"
            ref={fileInputRef} // Set the ref to the file input
            onChange={handleFileChange} // Handle the change event
          />
        </div>
        <div className="flex flex-col items-center mt-4">
          <span className="text-gray-500">OR</span>
          <input
            type="url"
            placeholder="Paste image link"
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
            value={imageUrl}
            onChange={handleUrlChange}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImageComponent;
