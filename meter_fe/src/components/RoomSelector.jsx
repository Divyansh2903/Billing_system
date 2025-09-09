import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { API_ENDPOINTS } from "../constants/api_consts";

const RoomSelector = ({ onRoomChange }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedRoom(value);
    onRoomChange && onRoomChange(value);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await axios.get(API_ENDPOINTS.GET_ALL_ROOMS);
        setRooms(rooms.data);
      } catch (e) {
        alert("Error Fetching Rooms")
      }

    }
    fetchRooms();

  }, []);

  return (
    <div className="p-4">
      <select
        value={selectedRoom}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg text-black "
      >
        <option value="" disabled>Select a room</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.number}>
            Room {room.number}
          </option>
        ))}

      </select>
    </div>
  );
};

export default RoomSelector;
