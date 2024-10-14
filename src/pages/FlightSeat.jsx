import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBusinessClassSeats, getEconomyClassSeats } from "../lib/api/Seat";
import { useSelector } from "react-redux";
import Button from "../components/ui/Button";

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
        console.error(
          `Error fetching ${classType.toLowerCase()} class seats:`,
          error
        );
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
        className={`grid gap-5`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {seatData.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatId);
          const isTaken = seat.status === "Taken";
          const baseColor =
            cabinType === "Business" ? "bg-yellow-300" : "bg-blue-300";
          const selectedColor =
            cabinType === "Business" ? "bg-yellow-500" : "bg-blue-500";
          const takenColor = "bg-gray-400";
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
    navigate("/user-information");
  };

  return (
    <div className="z-40 w-full h-full items-center flex justify-center">
      <div className="max-w-[1024px] h-full p-10 ">
        <h2 className="text-center text-xl font-bold my-10">
          Select Your Seats
        </h2>
        <div className="bg-gray-200 p-20 rounded-2xl w-full">
          {classType === "Business" ? (
            <div className="border-b-2 mb-4 pb-4">
              <h3 className="text-center font-semibold mb-5">Business Cabin</h3>
              <div className="flex justify-between">
                <div>
                  {renderSeats(
                    seats.filter(
                      (seat) =>
                        seat.seatNumber >= 1 &&
                        seat.seatNumber <= 6 &&
                        seat.class === "Business"
                    ),
                    "Business",
                    3
                  )}
                </div>
                <div className="border-2 border-rose-500"></div>
                <div>
                  {renderSeats(
                    seats.filter(
                      (seat) =>
                        seat.seatNumber >= 7 &&
                        seat.seatNumber <= 12 &&
                        seat.class === "Business"
                    ),
                    "Business",
                    3
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-center font-semibold mb-5">Economy Cabin</h3>
              <div className="flex justify-center">
                <div>
                  {renderSeats(
                    seats.filter(
                      (seat) =>
                        seat.seatNumber >= 13 &&
                        seat.seatNumber <= 27 &&
                        seat.class === "Economy"
                    ),
                    "Economy",
                    3
                  )}
                </div>
                <div className="border-2 border-rose-500 mx-20"></div>
                <div>
                  {renderSeats(
                    seats.filter(
                      (seat) =>
                        seat.seatNumber >= 28 &&
                        seat.seatNumber <= 42 &&
                        seat.class === "Economy"
                    ),
                    "Economy",
                    3
                  )}
                </div>
              </div>
            </div>
          )}
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
