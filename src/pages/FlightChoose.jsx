import Container from "../components/ui/Container";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { searchOneWayFlight, searchReturnFlight } from "../lib/api/Flight";
import { setFlight, setReturnFlight } from "../lib/redux/reducers/bookingSlice";

const FlightChoose = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isReturnFlight } = location.state || {};
  const selectedFlightDetails = useSelector(
    (state) => state.flights.selectedFlightDetails
  );

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      !selectedFlightDetails.departureLocation ||
      !selectedFlightDetails.arrivalLocation
    ) {
      // If no flight details, navigate back to booking form
      navigate("/");
      return;
    }

    const fetchFlights = async () => {
      try {
        setLoading(true);
        const departureLocation = selectedFlightDetails.departureLocation;
        const arrivalLocation = selectedFlightDetails.arrivalLocation;
        const departureDate = selectedFlightDetails.departureDate;
        const returnDate = selectedFlightDetails.returnDate;

        let data;
        if (isReturnFlight) {
          data = await searchReturnFlight(
            arrivalLocation,
            departureLocation,
            returnDate
          );
        } else {
          data = await searchOneWayFlight(
            departureLocation,
            arrivalLocation,
            departureDate
          );
        }

        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("No Flight Found");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [selectedFlightDetails, isReturnFlight, navigate]);

  const handleSelectFlight = (flight) => {
    const flightBookingDetails = {
      flightId: flight.flightId,
      flightNumber: flight.flightNumber,
      departureLocation: flight.departureLocationName,
      departureTime: flight.departureTime,
      arrivalLocation: flight.arrivalLocationName,
      arrivalTime: flight.arrivalTime,
      classType: flight.availableBusinessSeats > 0 ? "Business" : "Economy",
      price:
        flight.availableBusinessSeats > 0
          ? flight.businessPrice
          : flight.economyPrice,
    };

    if (isReturnFlight) {
      dispatch(setReturnFlight(flightBookingDetails));
      navigate("/flight-seat", {
        state: {
          flightId: flight.flightId,
          classType: flightBookingDetails.classType,
          isReturnFlight: true,
        },
      });
    } else {
      dispatch(setFlight(flightBookingDetails));
      navigate("/flight-seat", {
        state: {
          flightId: flight.flightId,
          classType: flightBookingDetails.classType,
          isReturnFlight: false,
        },
      });
    }
  };

  if (loading) {
    return <div className="container px-24">Loading...</div>;
  }

  if (error) {
    return <div className="container px-24 text-red-500">{error}</div>;
  }

  return (
    <div className="container h-full overflow-y-auto px-24">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Choose Your Flight
      </h2>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-2 bg-white shadow-lg rounded-lg p-4 mb-6">
        {/* Column 1 takes 1/3 with no content */}
        <div className="col-span-1"></div>

        <div className="col-span-2 grid grid-cols-2 gap-4 text-center font-semibold text-gray-600">
          <div>From: {selectedFlightDetails.departureLocation.location}</div>
          <div>To: {selectedFlightDetails.arrivalLocation.location}</div>
        </div>
      </div>

      {/* Flight list */}
      {flights.map((flight) => (
        <div
          key={flight.flightId} // Ensure each child has a unique key
          className="bg-white shadow-lg rounded-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="grid grid-cols-3 gap-2">
            {/* Time information column */}
            <div className="col-span-1 pr-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-blue-600">
                  Flight Number: {flight.flightNumber}
                </h3>
                <p className="text-sm text-gray-700">
                  Plane Code: {flight.planeCode}
                </p>
                <p className="text-sm text-gray-600">
                  {flight.departureLocationName} - {flight.arrivalLocationName}
                </p>
                <p className="text-sm text-gray-550">
                  Departure:{" "}
                  {new Date(flight.departureTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  - Arrival:{" "}
                  {new Date(flight.arrivalTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 text-center">
              <div className="border p-4 rounded-lg">
                <p className="font-semibold text-gray-600">Business</p>
                <p className="text-xl font-bold text-gray-800">
                  {flight.businessPrice}
                </p>
                <p className="text-sm text-gray-600">
                  Available: {flight.availableBusinessSeats}
                </p>
              </div>

              <div className="border p-4 rounded-lg">
                <p className="font-semibold text-gray-600">Economy</p>
                <p className="text-xl font-bold text-red-500">
                  {flight.economyPrice}
                </p>
                <p className="text-sm text-gray-600">
                  Available: {flight.availableEconomySeats}
                </p>
              </div>
            </div>
          </div>
          <button
            className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => handleSelectFlight(flight)}
            disabled={
              flight.availableBusinessSeats === 0 &&
              flight.availableEconomySeats === 0
            }
          >
            {isReturnFlight ? "Choose Return Flight" : "Continue"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlightChoose;
