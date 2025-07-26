import React, { useState } from 'react';

const ReadingDisplay = ({ reading, prevReading, onReadingChange ,getKWh}) => {
    const [inputReading,setReading]=useState('');
  const handleInputChange = (e) => {
        setReading(e.target.value);
    };
        const handleConfirm = () => {
        const value = inputReading.trim();
        if (value !== '') {
            onReadingChange(getKWh(value));
            setReading('');
        }
    };

    const handleCancel = () => {
        setReading('');
    };

    return (
        <div className='my-5'>
            <p className='text-m'>
                Your reading is {reading} KWh
                {prevReading !== 0 && ` and your previous reading was ${prevReading}`}
            </p>


            <div className="flex flex-col items-center justify-center my-2">
                <div>
                    <p>Do you want to edit the readings?</p>
                                <div className="flex items-center gap-2 mt-2">
                        <input
                            type="text"
                            value={inputReading}
                            onChange={handleInputChange}
                            placeholder="000012"
                            className="px-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none text-white"
                        />
                        <button
                            onClick={handleConfirm}
                            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                            disabled={!inputReading.trim()}
                        >
                            ✓
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                        >
                            ✗
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingDisplay;
