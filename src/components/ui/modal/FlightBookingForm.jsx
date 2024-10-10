import { useEffect, useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";

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
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flightList?.data || []);

  const departureDropdownRef = useRef(null);
  const arrivalDropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departureDropdownRef.current &&
        !departureDropdownRef.current.contains(event.target)
      ) {
        setIsDepartureDropdownOpen(false);
      }

      if (
        arrivalDropdownRef.current &&
        !arrivalDropdownRef.current.contains(event.target)
      ) {
        setIsArrivalDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    let errors = {};

    if (!selectedDeparture) {
      errors.departureLocation = "Please select a departure location.";
    }

    if (!selectedArrival) {
      errors.arrivalLocation = "Please select an arrival location.";
    }

    if (!departureDate) {
      errors.departureDate = "Please select a departure date.";
    }

    if (isRoundTrip && !returnDate) {
      errors.returnDate = "Please select a return date.";
    }

    if (
      isRoundTrip &&
      returnDate &&
      departureDate &&
      returnDate < departureDate
    ) {
      errors.returnDate = "Return date cannot be before departure date.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});
    const selectedFlightDetails = {
      isRoundTrip,
      departureLocation: selectedDeparture.flightRouteId,
      arrivalLocation: selectedArrival.flightRouteId,
      departureDate: departureDate ? new Date(departureDate.getTime() - (departureDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0] : null,
      returnDate: isRoundTrip && returnDate ? new Date(returnDate.getTime() - (returnDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0] : null,
      adultCount,
      childCount,
      infantCount,
    };

    dispatch(setSelectedFlightDetails(selectedFlightDetails));
    navigate("/flight-choose");
  };

  return (
    <div className="w-full p-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Welcome!
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Pick your trip options
      </p>

      {/* Ticket Type Selection */}
      <div className="flex items-center mb-6 justify-center space-x-8">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            value="round-trip"
            checked={isRoundTrip}
            onChange={() => setIsRoundTrip(true)}
            className="form-radio h-5 w-5 text-yellow-500 transition duration-300"
          />
          <span className="text-xl text-gray-700">Round Trip</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            value="one-way"
            checked={!isRoundTrip}
            onChange={() => setIsRoundTrip(false)}
            className="form-radio h-5 w-5 text-yellow-500 transition duration-300"
          />
          <span className="text-xl text-gray-700">One Way</span>
        </label>
      </div>

      {/* Departure and Arrival Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
        <div className="relative">
          <div
            className={`w-full flex items-center border-2 rounded-xl p-6 cursor-pointer transition duration-300 ${
              errors.departureLocation
                ? "border-red-500"
                : "border-gray-300 hover:border-yellow-400 focus-within:border-yellow-400"
            }`}
            onClick={handleDepartureClick}
          >
            <IoAirplaneSharp size={25} className="text-yellow-500" />
            <input
              type="text"
              value={selectedDeparture ? selectedDeparture.location : ""}
              placeholder="Departure Location"
              className="w-full ml-4 text-lg text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              readOnly
            />
          </div>
          {errors.departureLocation && (
            <p className="text-red-500 text-sm mt-2">
              {errors.departureLocation}
            </p>
          )}
          {isDepartureDropdownOpen && Array.isArray(flights) && (
            <div
              ref={departureDropdownRef}
              className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-xl max-h-60 overflow-y-auto z-20 shadow-md mt-1"
            >
              {flights.map((flight, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-yellow-50 cursor-pointer transition"
                  onClick={() => handleDepartureSelect(flight)}
                >
                  <div className="font-semibold">{flight.location}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className={`w-full flex items-center border-2 rounded-xl p-6 transition duration-300 ${
              errors.departureDate
                ? "border-red-500"
                : "border-gray-300 hover:border-yellow-400 focus-within:border-yellow-400"
            }`}
          >
            <label className="mr-4 text-lg text-gray-700">Departure Date</label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full outline-none bg-transparent"
              placeholderText="Select departure date"
            />
          </div>
          {errors.departureDate && (
            <p className="text-red-500 text-sm mt-2">{errors.departureDate}</p>
          )}
        </div>
      </div>

      {/* Arrival Airport Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
        <div className="relative">
          <div
            className={`w-full flex items-center border-2 rounded-xl p-6 cursor-pointer transition duration-300 ${
              errors.arrivalLocation
                ? "border-red-500"
                : "border-gray-300 hover:border-yellow-400 focus-within:border-yellow-400"
            }`}
            onClick={handleArrivalClick}
          >
            <IoAirplaneSharp
              size={25}
              className="text-yellow-500 transform rotate-180"
            />
            <input
              type="text"
              value={selectedArrival ? selectedArrival.location : ""}
              placeholder="Arrival Location"
              className="w-full ml-4 text-lg text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              readOnly
            />
          </div>
          {errors.arrivalLocation && (
            <p className="text-red-500 text-sm mt-2">
              {errors.arrivalLocation}
            </p>
          )}
          {isArrivalDropdownOpen && Array.isArray(flights) && (
            <div
              ref={arrivalDropdownRef}
              className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-xl max-h-60 overflow-y-auto z-20 shadow-md mt-1"
            >
              {flights
                .filter(
                  (flight) => flight.location !== selectedDeparture.location
                )
                .map((flight, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-yellow-50 cursor-pointer transition"
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
          <div className="relative">
            <div
              className={`w-full flex items-center border-2 rounded-xl p-6 transition duration-300 ${
                errors.returnDate
                  ? "border-red-500"
                  : "border-gray-300 hover:border-yellow-400 focus-within:border-yellow-400"
              }`}
            >
              <label className="mr-4 text-lg text-gray-700">Return Date</label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full outline-none bg-transparent"
                placeholderText="Select return date"
              />
            </div>
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-2">{errors.returnDate}</p>
            )}
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
        label="Find Flight"
        containerStyles="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold p-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 transition mt-6"
        onClick={handleFindFlight}
      />
    </div>
  );
};

export default FlightBookingForm;
