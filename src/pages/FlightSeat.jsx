import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const FlightSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate(); 

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const renderSeats = (start, end, columns, cabinType) => {
    const seats = [];
    for (let i = start; i <= end; i++) {
      const seatNumber = i;
      const isSelected = selectedSeats.includes(seatNumber);
      const baseColor = cabinType === 'business' ? 'bg-yellow-300' : 'bg-blue-300';
      const selectedColor = cabinType === 'business' ? 'bg-yellow-500' : 'bg-blue-500';
      seats.push(
        <button
          key={seatNumber}
          onClick={() => toggleSeatSelection(seatNumber)}
          className={`m-1 w-10 h-10 rounded-full ${
            isSelected ? selectedColor : baseColor
          } hover:${selectedColor}`}
        >
          {seatNumber}
        </button>
      );
    }
    return (
      <div
        className={`grid gap-2`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {seats}
      </div>
    );
  };

  const handleNextClick = () => {
    navigate('/flight-booking');
  };

  return (
    <div className="flex justify-center items-start">
      <div className="max-w-lg bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-bold mb-4">Select Your Seats</h2>
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="border-b-2 mb-4 pb-4">
            <h3 className="text-center font-semibold mb-2">Business Cabin</h3>
            <div className="flex justify-between">
              <div>{renderSeats(1, 6, 2, 'business')}</div>
              <div className="border-l-2 mx-4"></div>
              <div>{renderSeats(7, 12, 2, 'business')}</div>
            </div>
          </div>
          <div>
            <h3 className="text-center font-semibold mb-2">Economy Cabin</h3>
            <div className="flex justify-between">
              <div>{renderSeats(13, 27, 3, 'economy')}</div>
              <div className="border-l-2 mx-4"></div>
              <div>{renderSeats(28, 42, 3, 'economy')}</div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleNextClick}
        className="ml-4 mt-4 bg-blue-500 text-white font-semibold p-4 rounded-2xl hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  );
};

export default FlightSeat;