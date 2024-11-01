import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllFlight, createFlight } from "../lib/api/Flight";
import { getAllPlanes } from "../lib/api/Plane";
import { getLocations } from "../lib/api/Location";

function ManageFlight() {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    departureLocation: "",
    departureTime: "",
    arrivalLocation: "",
    arrivalTime: "",
    planeId: "",
  });

  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlight();
        setFlights(response.data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    const fetchPlanes = async () => {
      try {
        const response = await getAllPlanes();
        setPlanes(response.data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching planes:", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await getLocations();
        setLocations(response.data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchFlights();
    fetchPlanes();
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: name === "departureLocation" || name === "arrivalLocation" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createFlight(flightData);
      setFlights([...flights, response.data]);
      setMessage("Flight created successfully");
      setMessageType("success");
      setIsAdding(false);
    } catch (error) {
      setMessage("There was an error creating the flight");
      setMessageType("error");
    }
  };

  const filteredArrivalLocations = locations.filter(
    (location) => location.flightRouteId !== parseInt(flightData.departureLocation, 10)
  );

  const filteredDepartureLocations = locations.filter(
    (location) => location.flightRouteId !== parseInt(flightData.arrivalLocation, 10)
  );

  return (
    <div className="w-full flex h-full flex-col items-center justify-start gap-5 mx-20 overflow-auto z-20">
      <h1 className="text-2xl font-bold text-center mb-6">Flight Management</h1>

      <div className="w-full p-6 bg-white rounded-2xl shadow-2xl">
        <div className="flex justify-end mb-6">
          <button
            className="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary hover:text- hover:border-primary active:border-primary active:text-black max-w-[300px] text-white cursor-pointer bg-green-600"
            onClick={() => setIsAdding(true)}
          >
            Add Flight
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
            <input
              id="flightNumber"
              type="text"
              name="flightNumber"
              value={flightData.flightNumber}
              onChange={handleChange}
              placeholder="Flight Number"
              required
              className="p-2 border border-gray-300 rounded-lg"
            />

            {/* Departure Location Dropdown */}
            <select
              name="departureLocation"
              value={flightData.departureLocation}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Departure Location</option>
              {filteredDepartureLocations.map((location) => (
                <option key={location.flightRouteId} value={location.flightRouteId}>
                  {location.location}
                </option>
              ))}
            </select>

            <input
              id="departureTime"
              type="datetime-local"
              name="departureTime"
              value={flightData.departureTime}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />

            {/* Arrival Location Dropdown */}
            <select
              name="arrivalLocation"
              value={flightData.arrivalLocation}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Arrival Location</option>
              {filteredArrivalLocations.map((location) => (
                <option key={location.flightRouteId} value={location.flightRouteId}>
                  {location.location}
                </option>
              ))}
            </select>

            <input
              id="arrivalTime"
              type="datetime-local"
              name="arrivalTime"
              value={flightData.arrivalTime}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />

            {/* Plane selection dropdown */}
            <select
              name="planeId"
              value={flightData.planeId}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Plane</option>
              {planes.map((plane) => (
                <option key={plane.planeId} value={plane.planeId}>
                  {plane.planeCode}
                </option>
              ))}
            </select>

            <button type="submit" className="bg-green-600 text-white p-3 rounded-lg">
              Create Flight
            </button>
          </form>
        )}

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <ul className="space-y-4 w-full">
          {flights.map((flight) => {
            if (!flight || !flight.flightNumber) return null; // Check for undefined flight or flightNumber
            return (
              <li key={flight.flightId} className="flex justify-between items-center p-3 border border-gray-300 rounded-lg">
                <div>
                  <p>Flight Number: {flight.flightNumber}</p>
                  <p>From: {flight.departureLocationName} - To: {flight.arrivalLocationName}</p>
                  <p>Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
                  <p>Arrival Time: {new Date(flight.arrivalTime).toLocaleString()}</p>
                  <p>Status: {flight.flightStatus}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ManageFlight;
