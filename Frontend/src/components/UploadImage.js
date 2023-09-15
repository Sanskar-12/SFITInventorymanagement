import React, { useState } from "react";

function UploadImage({ uploadImage }) {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    setFileName(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload an Image
      </label>
      <div className="mt-1 flex items-center">
        <span className="inline-block bg-gray-100 py-2 px-4 rounded-l-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white font-semibold rounded-r-md py-2 px-4 transition duration-300 ease-in-out"
        >
          Choose File
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept=".png, .jpeg, .jpg"
          required
          onChange={handleFileInputChange}
        />
        <span className="ml-2 truncate">
          {fileName?.name ? fileName.name : "No file chosen"}
        </span>
      </div>
    </div>
  );
}

export default UploadImage;
