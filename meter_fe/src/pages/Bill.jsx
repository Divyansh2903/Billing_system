import React, { useState } from 'react';
import RoomSelector from '../components/RoomSelector';
import LoadingIndicator from '../components/LoadingIndicator';
import ImageUploadSection from '../components/ImageUploadSection';
import ReadingDisplay from '../components/ReadingDisplay';
import { useMeterReading } from '../hooks/useMeterReading';
import { useImageUpload } from '../hooks/useImageUpload';
import PaymentButton from '../components/PaymentButton';
import { useNavigate } from "react-router-dom";

function Bill() {
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  const {
    reading,
    prevReading,
    loading,
    uploadImageAndGetReading,
    updateReading,
    resetReading,
    getKWh
  } = useMeterReading();

  const {
    selectedImage,
    imagePreview,
    handleImageSelection,
    clearSelection
  } = useImageUpload();

  const handleGetBill = async () => {
    const res = await uploadImageAndGetReading(selectedImage, room);
    if (!res) {
      clearSelection();
      resetReading();
    }
  };

  const handleClearAll = () => {
    clearSelection();
    resetReading();
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <div className="w-full max-w-[600px] bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
        <h1 className="text-center text-3xl font-extrabold mb-8 text-gray-900">100x Billing System</h1>
        
        <div className="mb-4">
          <RoomSelector onRoomChange={setRoom} />
        </div>

        {room && (
          <div className="border border-gray-200 rounded-2xl shadow-md p-6 bg-gradient-to-r from-white to-gray-50">

            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-center text-gray-800">Upload Meter Image</h2>
              <ImageUploadSection
                imagePreview={imagePreview}
                selectedImage={selectedImage}
                onImageSelect={handleImageSelection}
                onClearSelection={handleClearAll}
              />
            </div>

            {imagePreview && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleGetBill}
                  disabled={loading}
                  className="btn-secondary"
                >
                  {loading ? <LoadingIndicator /> : "Get Bill"}
                </button>
              </div>
            )}

            {(reading !== null) && (
              <div className="space-y-6">
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Reading Details</h3>
                  <ReadingDisplay
                    reading={reading}
                    prevReading={prevReading}
                    getKWh={getKWh}
                    onReadingChange={updateReading}
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Options</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <PaymentButton 
                      roomNumber={room} 
                      reading={reading} 
                      prevReading={prevReading} 
                      fileName={selectedImage.name} 
                    />
                    <button
                      onClick={() => {
                        navigate("/solana-payment", {
                          state: { room, reading, prevReading, fileName: selectedImage?.name }
                        });
                      }}
                      className="btn-secondary"
                    >
                      Pay using SOL
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bill;