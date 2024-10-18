import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllSeats } from "../lib/api/Seat";
import { useSelector, useDispatch } from "react-redux";
import { setSeat } from "../lib/redux/reducers/bookingSlice";
import Button from "../components/ui/Button";

const FlightSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { flightId } = location.state;

  const totalPassengers = useSelector((state) => state.bookings.passengerBooking.total);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatData = await getAllSeats(flightId);
        setSeats(seatData);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [flightId]);

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.some((s) => s.seatId === seat.seatId)) {
        return prevSelectedSeats.filter((s) => s.seatId !== seat.seatId);
      } else if (prevSelectedSeats.length < totalPassengers) {
        return [...prevSelectedSeats, seat];
      } else {
        alert(`You can only select up to ${totalPassengers} seats.`);
        return prevSelectedSeats;
      }
    });
  };

  const renderSeats = (seatData) => {
    return (
      <div className="grid grid-cols-3 gap-5">
        {seatData.map((seat) => {
          const isSelected = selectedSeats.some((s) => s.seatId === seat.seatId);
          const isTaken = seat.status === "Taken";
          const baseColor = seat.class === "Business" ? "bg-yellow-300" : "bg-blue-300";
          const selectedColor = seat.class === "Business" ? "bg-yellow-500" : "bg-blue-500";
          const takenColor = "bg-gray-400";
          return (
            <button
              key={seat.seatId}
              onClick={() => !isTaken && toggleSeatSelection(seat)}
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
    if (selectedSeats.length !== totalPassengers) {
      alert(`Please select exactly ${totalPassengers} seats.`);
      return;
    }
    dispatch(setSeat(selectedSeats));
    navigate("/user-information");
  };

  return (
    <div className="z-40 w-full h-full items-center flex justify-center">
      <div className="max-w-[1024px] h-full p-10 ">
        <h2 className="text-center text-xl font-bold my-10">
          Select Your Seats
        </h2>
        <div className="bg-gray-200 p-20 rounded-2xl w-full">
          <div className="border-b-2 mb-4 pb-4">
            <h3 className="text-center font-semibold mb-5">Business Cabin</h3>
            <div className="flex justify-between">
              <div className="w-1/2">
                {renderSeats(
                  seats.filter((seat) => seat.class === "Business").slice(0, Math.ceil(seats.filter((seat) => seat.class === "Business").length / 2))
                )}
              </div>
              <div className="border-l-2 border-red-500 mx-4"></div>
              <div className="w-1/2">
                {renderSeats(
                  seats.filter((seat) => seat.class === "Business").slice(Math.ceil(seats.filter((seat) => seat.class === "Business").length / 2))
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-center font-semibold mb-5">Economy Cabin</h3>
            <div className="flex justify-between">
              <div className="w-1/2">
                {renderSeats(
                  seats.filter((seat) => seat.class === "Economy").slice(0, Math.ceil(seats.filter((seat) => seat.class === "Economy").length / 2))
                )}
              </div>
              <div className="border-l-2 border-red-500 mx-4"></div>
              <div className="w-1/2">
                {renderSeats(
                  seats.filter((seat) => seat.class === "Economy").slice(Math.ceil(seats.filter((seat) => seat.class === "Economy").length / 2))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <Button
            label="Continue"
            onClick={handleNextClick}
            containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                    hover:text-black hover:border-primary
                    active:border-primary active:text-black
                    max-w-[200px] text-white cursor-pointer bg-black"
          />
        </div>
      </div>
    </div>
  );
};

export default FlightSeat;