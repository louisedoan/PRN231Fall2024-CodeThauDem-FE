import React, { useState, useEffect } from "react";
import {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
} from "../lib/api/Location";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { HeroCover } from "../components/ui/HeroCover";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";

const FlightRoutePage = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [editId, setEditId] = useState(null);
  const [editLocation, setEditLocation] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); // State to store the message type (success or error)


  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocations();
        console.log("Fetched data:", response); // Check the structure
        if (Array.isArray(response.data)) {
          setLocations(response.data);
          setMessage(response.message);
          setMessageType(response.isSuccess ? "success" : "error"); // Set the message type based on isSuccess
          console.log("Locations set:", response.data); // Debug log
        } else {
          console.error("Data is not an array:", response.data);
          setLocations([]); // Default to an empty array
          setMessage("Failed to retrieve locations.");
          setMessageType("error"); // Set the message type to error
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setLocations([]); // Default to an empty array in case of error
        setMessage("An error occurred while fetching locations.");
        setMessageType("error"); // Set the message type to error
      }
    };
    fetchLocations();
  }, []);

  const handleAddLocation = async () => {
    if (newLocation.trim()) {
      try {
        const payload = {
          location: newLocation.toString(),
        };
        const response = await createLocation(payload);
        toast.success("Location created successfully !");
        console.log("API response:", response); // Log the API response

        // Check if response.data exists
        if (response.data) {
          const newLoc = response.data; // The API returns the created location directly in data

          // Check if newLoc has location
          if (newLoc.location && newLoc.flightRouteId) {
            setLocations([...locations, newLoc]);
            setNewLocation("");
            setIsAdding(false);
            setMessage(response.message); // Set the message from the backend response
            setMessageType(response.isSuccess ? "success" : "error"); // Set the message type based on the response
          } else {
            throw new Error("Invalid response data: location is missing");
          }
        } else {
          console.error("Full response:", response); // Log the full response
          throw new Error("Invalid response data: data is missing");
        }
      } catch (error) {
        console.error("Failed to create location:", error.message);
        console.error("Error response:", error.response);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setMessage(error.response.data.message); // Set error message from backend
          setMessageType("error"); // Set the message type to error
        } else {
          setMessage("An error occurred while creating the location.");
          setMessageType("error");
        }
      }
    }
  };

  const handleEditLocation = (id) => {
    const location = locations.find((loc) => loc.flightRouteId === id);
    setEditId(id);
    setEditLocation(location.location);
  };

  const handleUpdateLocation = async () => {
    if (editLocation.trim()) {
      try {
        const payload = {
          flightRouteId: editId,
          location: editLocation.toString(),
        };
        const response = await updateLocation(payload);
        toast.success("Location updated successfully !");
        console.log("API response:", response); // Log the API response

        // Check if response.data exists
        if (response.data) {
          const updatedLoc = response.data; // The API returns the updated location directly in data

          // Check if updatedLoc has location and flightRouteId
          if (updatedLoc.location && updatedLoc.flightRouteId) {
            setLocations(
              locations.map((loc) =>
                loc.flightRouteId === updatedLoc.flightRouteId
                  ? updatedLoc
                  : loc
              )
            );
            setEditId(null);
            setEditLocation("");
            setMessage(response.message); // Set the message from the backend response
            setMessageType(response.isSuccess ? "success" : "error"); // Set the message type based on the response
          } else {
            throw new Error(
              "Invalid response data: location or flightRouteId is missing"
            );
          }
        } else {
          console.error("Full response:", response); // Log the full response
          throw new Error("Invalid response data: data is missing");
        }
      } catch (error) {
        console.error("Failed to update location:", error.message);
        console.error("Error response:", error.response);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setMessage(error.response.data.message); // Set error message from backend
          setMessageType("error"); // Set the message type to error
        } else {
          setMessage("An error occurred while updating the location.");
          setMessageType("error");
        }
      }
    } else {
      setMessage("Location cannot be empty.");
      setMessageType("error");
    }
  };

  const handleDeleteLocation = async (flightRouteId) => {
    toast.success("Location deleted !");
    console.log("Deleting flightRouteId:", flightRouteId); // Debug log
    if (!flightRouteId) {
      console.error("Invalid flightRouteId:", flightRouteId);
      return;
    }
    try {
      const response = await deleteLocation(flightRouteId);
      if (response && response.data && response.data.isSuccess) {
        const updatedLocations = locations.filter(
          (location) => location.flightRouteId !== flightRouteId
        );
        setLocations(updatedLocations);
        setMessage(response.data.message); // Set the message from the backend response
        setMessageType("success"); // Set the message type to success
        if (updatedLocations.length === 0) {
          setMessage("No existing locations");
          setMessageType("info");
        }
      } else {
        throw new Error(response.data.message || "Failed to delete location");
      }
    } catch (error) {
      console.error("Failed to delete location:", error.message);
      console.error("Error response:", error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message); // Set error message from backend
        setMessageType("error"); // Set the message type to error
      } else {
        setMessage("An error occurred while deleting the location.");
        setMessageType("error");
      }
    }
  };
  //UI
  return (
    <div className="w-full flex h-full flex-col items-center justify-start gap-5 mx-20 overflow-auto z-20">
      <h1 className="text-2xl font-bold text-center mb-6">
        <HeroCover>Manage Flight Routes</HeroCover>
      </h1>

      <div className="w-full p-6 bg-white rounded-2xl shadow-2xl ">
        <div className="flex justify-end mb-6">
          <Button
            label="Add Location"
            onClick={() => {
              console.log("Add Location button clicked");
              setIsAdding(true);
            }}
            containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                            hover:text-  hover:border-primary
                            active:border-primary active:text-black
                            max-w-[300px] text-white cursor-pointer bg-green-600"
          />
        </div>
        {isAdding && (
          <div className="flex mb-6 justify-between">
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter location name"
              className="flex-1 p-2 border border-gray-300 rounded-l-lg max-w-[600px]"
            />
            <div className="flex flex-row justify-between gap-3">
              <Button
                label="Save"
                onClick={handleAddLocation}
                containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                                hover:text-black hover:border-primary
                                active:border-primary active:text-black max-w-[300px]
                                w-full text-white cursor-pointer bg-black"
              />
              <Button
                label="Cancel"
                onClick={() => setIsAdding(false)}
                containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-secondary transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                                hover:text-black hover:border-primary
                                active:border-primary active:text-black max-w-[300px]
                                w-full text-white cursor-pointer bg-black"
              />
            </div>
          </div>
        )}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <ul className="space-y-4 w-full">
          {locations.map((location, index) => (
            <li
              key={`${location.flightRouteId}-${index}`}
              className="flex flex-row justify-start items-center p-3 border border-gray-300 rounded-xl w-full"
            >
              {editId === location.flightRouteId ? (
                <div className="flex flex-row w-full">
                  <div className="flex justify-between gap-20 w-full">
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-l-lg"
                    />
                    <Button
                      label="Update"
                      onClick={handleUpdateLocation}
                      containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-yellow-700 transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                                hover:text-black hover:border-primary
                                active:border-primary active:text-black max-w-[100px]
                                w-full text-black cursor-pointer bg-yellow-500"
                    />
                  </div>

                  <Button
                    label="Cancel"
                    onClick={() => setEditId(null)}
                    containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-yellow-700 transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                                hover:text-black hover:border-primary
                                active:border-primary active:text-black max-w-[100px]
                                w-full text-black cursor-pointer bg-yellow-500"
                  />
                </div>
              ) : (
                <div className="flex flex-1 justify-between items-center gap-2">
                  <span className="flex-1">{location.location}</span>
                  <Button
                    label="Edit"
                    onClick={() => handleEditLocation(location.flightRouteId)}
                    containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-yellow-700 transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                                hover:text-black hover:border-primary
                                active:border-primary active:text-black max-w-[100px]
                                w-full text-black cursor-pointer bg-yellow-500"
                  />
                  <Button
                    label="Delete"
                    onClick={() => handleDeleteLocation(location.flightRouteId)}
                    containerStyles="hover:no-underline hover:rounded-tl-3xl hover:rounded-br-2xl hover:bg-red-700 transition-all duration-100 ease-out clickable flex items-center whitespace-nowrap justify-center font-semibold p-3 sm-bold-caps gap-x-2 border border-primary
                                hover:text-black hover:border-primary
                                active:border-primary active:text-black max-w-[100px]
                                w-full text-black cursor-pointer bg-secondary"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProtectedRoute(FlightRoutePage, ["Member"]);