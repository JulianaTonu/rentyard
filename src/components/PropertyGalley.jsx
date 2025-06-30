import React, { useState } from 'react';
import pdf from "../assets/pdf.png";
import VideoSection from './VideoSection';
import { useNavigate } from 'react-router-dom';

const UploadBox = ({ onChange, size = 'small' }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const fileType = file.type;
      setPreview({ url: fileURL, type: fileType });
      onChange && onChange(file);
    }
  };

  const boxSize = size === 'large' ? 'w-40 h-32' : 'w-18 h-15';

  return (
    <label
      className={`border border-dashed border-blue-400 bg-gray-50 hover:border-blue-600 transition 
        rounded-md flex items-center justify-center overflow-hidden cursor-pointer ${boxSize}`}
    >
      {preview ? (
        preview.type === 'application/pdf' ? (
          <img src={pdf} alt="PDF Preview" className="w-8" />
        ) : (
          <img src={preview.url} alt="Preview" className="object-cover w-full h-full" />
        )
      ) : (
        <div className="text-gray-400 text-xs text-center border border-dashed p-0.5">
          <img src={pdf} className='w-5 mx-auto' alt="Upload Placeholder" />

        </div>
      )}
      <input
        type="file"
        accept="image/png, image/jpeg, application/pdf"
        onChange={handleFile}
        className="hidden"
      />
    </label>
  );
};

const PropertyGallery = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [featuredPhotos, setFeaturedPhotos] = useState(Array(4).fill(null));
  const [morePhotos, setMorePhotos] = useState(Array(8).fill(null));
  const navigate = useNavigate();

  const updatePhoto = (index, file, list, setter) => {
    const updated = [...list];
    updated[index] = file;
    setter(updated);
  };
  console.log(coverPhoto)
  return (
   <>
    <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-4">
      <p className="text-md font-semibold border-b border-gray-200 pb-2">
        Property gallery <span className="text-gray-500">(It's not unit photo)</span> <span className="text-red-500">*</span>
      </p>

      <div className='flex justify-start items-start gap-4 ml-2'>
        <p className="text-sm font-semibold">
          Featured photos <span className="text-red-500">*</span>
        </p>
        <p className="text-sm font-semibold text-gray-600 ml-52">
          More photos <span className="text-gray-400">(optional)</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Cover Photo */}
        <UploadBox size="large" onChange={setCoverPhoto} />

        {/* Featured Photos */}
        <div className="grid grid-cols-2 gap-2">
          {featuredPhotos.map((_, i) => (
            <UploadBox
              key={`featured-${i}`}
              size="small"
              onChange={(file) => updatePhoto(i, file, featuredPhotos, setFeaturedPhotos)}
            />
          ))}
        </div>

        {/* More Photos */}
        <div>
          <div className="grid grid-cols-4 gap-2 pl-4">
            {morePhotos.map((_, i) => (
              <UploadBox
                key={`more-${i}`}
                size="small"
                onChange={(file) => updatePhoto(i, file, morePhotos, setMorePhotos)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <VideoSection />

     
    </div>
     {/* footer Buttons */}
      <div className="  items-center  w-[1280px] bg-white px-10 p-4 flex justify-between mx-auto ">
        <button
          type="button"
          onClick={() => navigate(`/`)}
          className="text-blue-500 font-semibold cursor-pointer hover:border hover:bg-gray-50  px-3 py-2 rounded-md"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={() => navigate(`/profile`)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Get Started
        </button>
      </div>
   </>
  );
};

export default PropertyGallery;
