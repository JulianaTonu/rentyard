import React, { useState } from 'react';
import pdf from "../assets/pdf.png"
import VideoSection from './VideoSection';
const UploadBox = ({ onChange, size = 'small' }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
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
        <img src={preview} alt="Preview" className="object-cover w-full h-full" />
      ) : (
        <div className="text-gray-400 text-xs text-center border border-dashed">
            <img src={pdf} className='w-5' alt="" />
        </div>
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
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

  const updatePhoto = (setter, index, fileList) => {
    const updated = [...fileList];
    updated[index] = fileList;
    setter(updated);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-4">
         <p className="text-md font-semibold border-b border-gray-200 pb-2">
        Property gallery <span className="text-gray-500">(It's not unit photo)</span> <span className="text-red-500">*</span>
      </p>
     <div className='flex justify-start items-start gap-4 ml-2'>
         <p className="text-sm font-semibold">
        Featured photos <span className="text-gray-500"></span> <span className="text-red-500">*</span>
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
              onChange={(file) => {
                const updated = [...featuredPhotos];
                updated[i] = file;
                setFeaturedPhotos(updated);
              }}
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
              onChange={(file) => {
                const updated = [...morePhotos];
                updated[i] = file;
                setMorePhotos(updated);
              }}
            />
          ))}
        </div>
       </div>
      </div>

      {/* Videos (optional) Section*/}
      <VideoSection/>
    </div>
  );
};

export default PropertyGallery;
