import React from 'react';

const ReadingDisplay = ({ reading, prevReading, onReadingChange }) => {

    const handleManualOverride = (e) => {
        const value = e.target.value.trim();
        if (value !== '') {
            onReadingChange(value);
        }
    };

    return (
        <div className='my-5'>
            <p className='text-m'>
                Your reading is {reading}
                {prevReading !== 0 && ` and your previous reading was ${prevReading}`}
            </p>


            <div className="flex flex-col items-center justify-center my-2">
                <div>
                    <p>Do you want to edit the readings?</p>
                    <input
                        type="text"
                        onChange={handleManualOverride}
                        placeholder="Readings"
                        className="px-4 py-2 border border-gray-300 rounded-md placeholder-white focus:outline-none text-white mt-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReadingDisplay;
