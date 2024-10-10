import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBusinessClassSeats, getEconomyClassSeats } from "../lib/api/Seat";

const FlightSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { flightId, classType } = location.state;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        let seatData;
        if (classType === "Business") {
          seatData = await getBusinessClassSeats(flightId);
        } else {
          seatData = await getEconomyClassSeats(flightId);
        }
        setSeats(seatData);
      } catch (error) {
        console.error(`Error fetching ${classType.toLowerCase()} class seats:`, error);
      }
    };

    fetchSeats();
  }, [flightId, classType]);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((s) => s !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const renderSeats = (seatData, cabinType, columns) => {
    return (
      <div
        className={`grid gap-2`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {seatData.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatId);
          const isTaken = seat.status === 'Taken';
          const baseColor = cabinType === 'Business' ? 'bg-yellow-300' : 'bg-blue-300';
          const selectedColor = cabinType === 'Business' ? 'bg-yellow-500' : 'bg-blue-500';
          const takenColor = 'bg-gray-400';
          return (
            <button
              key={seat.seatId}
              onClick={() => !isTaken && toggleSeatSelection(seat.seatId)}
              className={`m-1 w-10 h-10 rounded-full ${
                isTaken ? takenColor : isSelected ? selectedColor : baseColor
              } hover:${!isTaken && selectedColor}`}
              disabled={isTaken}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>
    );
  };

  const handleNextClick = () => {
    navigate('/user-information');
  };

  return (
    <div className="flex justify-center items-start">
      <div className="max-w-lg bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-bold mb-4">Select Your Seats</h2>
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="border-b-2 mb-4 pb-4">
            <h3 className="text-center font-semibold mb-2">Business Cabin</h3>
            <div className="flex justify-between">
              <div>{renderSeats(seats.filter(seat => seat.seatNumber >= 1 && seat.seatNumber <= 6 && seat.class === 'Business'), 'Business', 3)}</div>
              <div className="border-l-2 mx-4"></div>
              <div>{renderSeats(seats.filter(seat => seat.seatNumber >= 7 && seat.seatNumber <= 12 && seat.class === 'Business'), 'Business', 3)}</div>
            </div>
          </div>
          <div>
            <h3 className="text-center font-semibold mb-2">Economy Cabin</h3>
            <div className="flex justify-between">
              <div>{renderSeats(seats.filter(seat => seat.seatNumber >= 13 && seat.seatNumber <= 27 && seat.class === 'Economy'), 'Economy', 3)}</div>
              <div className="border-l-2 mx-4"></div>
              <div>{renderSeats(seats.filter(seat => seat.seatNumber >= 28 && seat.seatNumber <= 42 && seat.class === 'Economy'), 'Economy', 3)}</div>
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