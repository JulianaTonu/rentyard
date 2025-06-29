import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa'; // Optional icon package (or replace with <img src="..." />)

const VideoUploadBox = ({ label }) => {
  const [fileName, setFileName] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-1">
      <p className="text-sm text-gray-800 font-medium">{label} <span className="text-gray-400">(optional)</span></p>
      <label className="w-32 h-28 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center rounded-md bg-blue-50 hover:border-blue-500 cursor-pointer transition">
        <FaUpload className="text-blue-500 mb-1" />
        <span className="text-xs text-gray-600 text-center">Upload video</span>
        <span className="text-[10px] text-gray-400">(MP4, MOV only)</span>
        <input
          type="file"
          accept="video/mp4, video/quicktime"
          onChange={handleVideoChange}
          className="hidden"
        />
      </label>
      {fileName && <p className="text-xs text-gray-500 mt-1 truncate w-32">{fileName}</p>}
    </div>
  );
};

const VideoSection = () => {
  return (
    <details open className="border border-gray-200 rounded-lg p-4 bg-white mt-6">
      <summary className="cursor-pointer text-sm font-medium text-gray-800">
        Videos <span className="text-gray-400">(optional)</span>
      </summary>

      <div className="flex gap-6 mt-4 flex-wrap">
        <VideoUploadBox label="Property Video" />
        <VideoUploadBox label="Property virtual tour" />
        <VideoUploadBox label="Property arial video" />
      </div>
    </details>
  );
};

export default VideoSection;
