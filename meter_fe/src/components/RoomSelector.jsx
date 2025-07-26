import { useState } from "react";

const RoomSelector = ({ onRoomChange }) => {
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedRoom(value);
    onRoomChange && onRoomChange(value); 
  };

  return (
    <div className="p-4">
      <select
        value={selectedRoom}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg text-white "
      >
        <option value="" disabled>Select a room</option>
        {Array.from({ length: 200 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            Room {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoomSelector;
