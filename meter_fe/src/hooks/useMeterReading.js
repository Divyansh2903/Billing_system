
import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/api_consts';

export const useMeterReading = () => {
  const [reading, setReading] = useState(null);
  const [prevReading, setPrevReading] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadImageAndGetReading = async (imageFile, room) => {
    if (!imageFile) {
      alert("No image selected");
      return false;
    }
    console.log("hereee"+API_ENDPOINTS.UPLOAD_URL)

    setLoading(true);
    try {
      const response = await axios.post(API_ENDPOINTS.UPLOAD_URL, {
        fileName: imageFile.name,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const signedUrl = response.data.uploadURL;

      const uploadRes = await axios.put(signedUrl, imageFile, {
        headers: {
          'Content-Type': imageFile.type || 'application/octet-stream'
        }
      });

      if (uploadRes.status === 200) {
        
        const readingResponse = await axios.post(API_ENDPOINTS.GET_READING, {
          
          fileName: imageFile.name,
          roomNumber: room
        }, {
          headers: { 'Content-Type': 'application/json' }
        });


        if (readingResponse.data.output.toLowerCase() === "na") {
          alert("Please upload an apt photo");
          return false;
        }

        setReading(readingResponse.data.output);
        setPrevReading(readingResponse.data.prevReading);
        return true;
      } else {
        alert("Upload failed");
        return false;
      }
    } catch (error) {
      console.error("Error uploading image or getting reading:", error);
      alert("An error occurred. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateReading = (newReading) => {
    setReading(newReading);
  };

  const resetReading = () => {
    setReading(null);
    setPrevReading(0);
    setLoading(false);
  };

  return {
    reading,
    prevReading,
    loading,
    uploadImageAndGetReading,
    updateReading,
    resetReading
  };
};