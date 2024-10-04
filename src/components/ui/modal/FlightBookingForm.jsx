import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAirplaneSharp } from "react-icons/io5";
import {
  fetchFlights,
  setSelectedFlightDetails,
} from "../../../lib/redux/reducers/flightSlice";
import Button from "../Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PassengerControl from "./PassengerControl";

const FlightBookingForm = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isDepartureDropdownOpen, setIsDepartureDropdownOpen] = useState(false);
  const [isArrivalDropdownOpen, setIsArrivalDropdownOpen] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flightList?.data || []);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleDepartureClick = () => {
    setIsDepartureDropdownOpen(!isDepartureDropdownOpen);
    setIsArrivalDropdownOpen(false);
  };

  const handleArrivalClick = () => {
    setIsArrivalDropdownOpen(!isArrivalDropdownOpen);
    setIsDepartureDropdownOpen(false);
  };

  const handleDepartureSelect = (location) => {
    setSelectedDeparture(location);
    setIsDepartureDropdownOpen(false);
  };

  const handleArrivalSelect = (location) => {
    setSelectedArrival(location);
    setIsArrivalDropdownOpen(false);
  };

  const handleFindFlight = () => {
    const selectedFlightDetails = {
      isRoundTrip,
      departureLocation: selectedDeparture,
      arrivalLocation: selectedArrival,
      departureDate,
      returnDate: isRoundTrip ? returnDate : null,
      adultCount,
      childCount,
      infantCount,
    };

    dispatch(setSelectedFlightDetails(selectedFlightDetails));
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl border-2 border-black">
      <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
      <p className="text-lg mb-6">Pick your trip options</p>

      {/* Ticket Type Selection */}
      <div className="flex items-center mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="round-trip"
            checked={isRoundTrip}
            onChange={() => setIsRoundTrip(true)}
            className="mr-2"
          />
          Khứ hồi
        </label>
        <label>
          <input
            type="radio"
            value="one-way"
            checked={!isRoundTrip}
            onChange={() => setIsRoundTrip(false)}
            className="mr-2"
          />
          Một chiều
        </label>
      </div>

      {/* Departure and Arrival Inputs */}
      <div className="flex gap-4 mb-4">
        {/* Departure Airport Input */}
        <div className="relative flex-1">
          <div
            className="w-full flex items-center border-2 border-black rounded-2xl p-4 cursor-pointer"
            onClick={handleDepartureClick}
          >
            <IoAirplaneSharp size={25} />
            <input
              type="text"
              value={selectedDeparture ? selectedDeparture.location : ""}
              placeholder="Điểm khởi hành"
              className="w-full ml-4 outline-none bg-transparent"
              readOnly
            />
          </div>
          {isDepartureDropdownOpen && Array.isArray(flights) && (
            <div className="absolute top-full left-0 w-full bg-white border border-black rounded-b-2xl max-h-60 overflow-y-auto z-20">
              {flights.map((flight, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDepartureSelect(flight)}
                >
                  <div className="font-semibold">{flight.location}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Departure Date Input */}
        <div className="relative flex-1">
          <div className="w-full flex items-center border-2 border-black rounded-2xl p-4">
            <label className="mr-4">Ngày đi</label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full outline-none"
              placeholderText="Chọn ngày đi"
            />
          </div>
        </div>
      </div>

      {/* Arrival Airport Input */}
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <div
            className="w-full flex items-center border-2 border-black rounded-2xl p-4 cursor-pointer"
            onClick={handleArrivalClick}
          >
            <IoAirplaneSharp
              size={25}
              style={{ transform: "rotate(-180deg)" }}
            />
            <input
              type="text"
              value={selectedArrival ? selectedArrival.location : ""}
              placeholder="Điểm đến"
              className="w-full ml-4 outline-none bg-transparent"
              readOnly
            />
          </div>
          {isArrivalDropdownOpen && Array.isArray(flights) && (
            <div className="absolute top-full left-0 w-full bg-white border border-black rounded-b-2xl max-h-60 overflow-y-auto z-20">
              {flights
                .filter(
                  (flight) => flight.location !== selectedDeparture.location
                )
                .map((flight, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleArrivalSelect(flight)}
                  >
                    <div className="font-semibold">{flight.location}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Return Date Input for Round Trip Only */}
        {isRoundTrip && (
          <div className="relative flex-1">
            <div className="w-full flex items-center border-2 border-black rounded-2xl p-4">
              <label className="mr-4">Ngày về</label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full outline-none"
                placeholderText="Chọn ngày về"
              />
            </div>
          </div>
        )}
      </div>

      {/* Passenger Control */}
      <PassengerControl
        adultCount={adultCount}
        setAdultCount={setAdultCount}
        childCount={childCount}
        setChildCount={setChildCount}
        infantCount={infantCount}
        setInfantCount={setInfantCount}
      />

      {/* Find Flight Button */}
      <Button
        label="Tìm chuyến bay"
        containerStyles="w-full bg-yellow-500 text-black font-semibold p-4 rounded-2xl hover:bg-yellow-600 transition"
        onClick={handleFindFlight}
      />
    </div>
  );
};

export default FlightBookingForm;
