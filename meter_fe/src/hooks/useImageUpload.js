import { useState } from 'react';
import { selectImage } from '../helpers/image_selector';

export const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelection = async () => {
    try {
      const imageFile = await selectImage();
      console.log("Selected image:", imageFile);

      setSelectedImage(imageFile);
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);

      return imageFile;
    } catch (error) {
      console.log("Error selecting image:", error);
      return null;
    }
  };

  const clearSelection = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setSelectedImage(null);
  };

  return {
    selectedImage,
    imagePreview,
    handleImageSelection,
    clearSelection
  };
};
