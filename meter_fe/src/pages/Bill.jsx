import React, { useState } from 'react';

import RoomSelector from '../components/RoomSelector';
import LoadingIndicator from '../components/LoadingIndicator';
import ImageUploadSection from '../components/ImageUploadSection';
import ReadingDisplay from '../components/ReadingDisplay';
import { useMeterReading } from '../hooks/useMeterReading';
import { useImageUpload } from '../hooks/useImageUpload';
import PaymentButton from '../components/PaymentButton';

function Bill() {
  const [room, setRoom] = useState(null);
  
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
    <div className='page-container'>
      <div className="w-full max-w-[600px] px-5 pt-2">
        <h2 className="flex justify-center">100x Billing System</h2>
        
        <div className="max-w-md mx-auto mt-10">
          <RoomSelector onRoomChange={setRoom} />
        </div>

        {room && (
          <div>
            <ImageUploadSection
              imagePreview={imagePreview}
              selectedImage={selectedImage}
              onImageSelect={handleImageSelection}
              onClearSelection={handleClearAll}
            />

            {imagePreview && (
              <div className="flex justify-center">
                <button
                  onClick={handleGetBill}
                  disabled={loading}
                  class= "btn-primary"
                >
                  {loading ? <LoadingIndicator /> : <p>Get Bill</p>}
                </button>
              </div>
            )}

            {reading && (
              <>
                <ReadingDisplay
                  reading={reading}
                  prevReading={prevReading}
                  getKWh={getKWh}
                  onReadingChange={updateReading}

                />
                <div className="flex justify-center my-2">
                  <PaymentButton roomNumber={room} reading={reading} fileName={selectedImage.name}/>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bill;