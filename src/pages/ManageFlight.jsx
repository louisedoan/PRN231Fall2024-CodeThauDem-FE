import React, { useState, useEffect } from "react";
import { getAllFlight } from   "../lib/api/Flight"; // Import the function

function ManageFlight() {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    departureLocation: "",
    departureTime: "",
    arrivalLocation: "",
    arrivalTime: "",
    flightStatus: "",
  });
  
  const [flights, setFlights] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch existing flights when component mounts
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlight(); // Call the getAllFlight function
        setFlights(response.data); // Update the flights state with fetched data
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights(); // Call the function
  }, []);

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/flights", flightData)
      .then(response => {
        console.log("Flight created successfully", response.data);
        setFlights([...flights, response.data]); // Add the new flight to the flight list
        setMessage("Flight created successfully");
        setMessageType("success");
      })
      .catch(error => {
        console.error("Error creating flight:", error);
        setMessage("There was an error creating the flight");
        setMessageType("error");
      });
  };

  return (
    <div className="w-full flex h-full flex-col items-center justify-start gap-5 mx-20 overflow-auto z-20">
      <h1 className="text-2xl font-bold text-center mb-6">
        Flight Management
      </h1>

      <div className="w-full p-6 bg-white rounded-2xl shadow-2xl ">
        <div className="flex justify-end mb-6">
          <button
            className="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                            hover:text-  hover:border-primary
                            active:border-primary active:text-black
                            max-w-[300px] text-white cursor-pointer bg-green-600"
            onClick={() => setIsAdding(true)}
          >
            Add Flight
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              name="flightNumber"
              value={flightData.flightNumber}
              onChange={handleChange}
              placeholder="Flight Number"
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="departureLocation"
              value={flightData.departureLocation}
              onChange={handleChange}
              placeholder="Departure Location"
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="datetime-local"
              name="departureTime"
              value={flightData.departureTime}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="arrivalLocation"
              value={flightData.arrivalLocation}
              onChange={handleChange}
              placeholder="Arrival Location"
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="datetime-local"
              name="arrivalTime"
              value={flightData.arrivalTime}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="flightStatus"
              value={flightData.flightStatus}
              onChange={handleChange}
              placeholder="Flight Status"
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
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
          {flights.map((flight, index) => (
            <li key={flight.flightNumber} className="flex justify-between items-center p-3 border border-gray-300 rounded-lg">
              <div>
                <p>Flight Number: {flight.flightNumber}</p>
                <p>From: {flight.departureLocation} - To: {flight.arrivalLocation}</p>
                <p>Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
                <p>Arrival Time: {new Date(flight.arrivalTime).toLocaleString()}</p>
                <p>Status: {flight.flightStatus}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageFlight;
