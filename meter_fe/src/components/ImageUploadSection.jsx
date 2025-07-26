import React from 'react';
import { AiOutlineUpload, AiTwotoneDelete } from "react-icons/ai";

const ImageUploadSection = ({ 
  imagePreview, 
  selectedImage, 
  onImageSelect, 
  onClearSelection 
}) => {
  return (
    <div>
      <h3 className='my-2'>Upload the photo of the meter</h3>
      
      <div className="flex flex-col justify-center items-center h-80 border-2 border-primaryColor rounded-2xl border-dotted my-4">
        {imagePreview ? (
          <div className="w-full h-full overflow-hidden">
            <img
              src={imagePreview}
              alt="Selected photo"
              className="w-full h-full object-cover object-top rounded-xl"
            />
          </div>
        ) : (
          <div>
            <div className="w-20 h-20 bg-primaryColor rounded-full flex justify-center items-center m-2">
              <AiOutlineUpload 
                onClick={onImageSelect} 
                color='white' 
                className="h-10 w-10 cursor-pointer"
              />
            </div>
            <h2>Upload Photo</h2>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="bg-primaryColor p-3 rounded-2xl flex justify-between items-center">
          <div>
            <p>File: {selectedImage.name}</p>
          </div>
          <div>
            <AiTwotoneDelete 
              color='white' 
              size={20} 
              onClick={onClearSelection}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;