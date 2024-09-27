import Container from "../components/ui/Container";
import { HeroCover } from "../components/ui/HeroCover";
import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { getLocations } from '../lib/api/Location'; // Import the getLocations function

const FlightRoutePage = () => {
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editLocation, setEditLocation] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // Fetch locations when the component mounts
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getLocations();
                console.log('Fetched data:', response); // Check the structure
                if (Array.isArray(response.data)) {
                    setLocations(response.data);
                    console.log('Locations set:', response.data); // Debug log
                } else {
                    console.error('Data is not an array:', response.data);
                    setLocations([]); // Default to an empty array
                }
            } catch (error) {
                console.error('Failed to fetch locations:', error);
                setLocations([]); // Default to an empty array in case of error
            }
        };
        fetchLocations();
    }, []);

    const handleAddLocation = () => {
        if (newLocation.trim()) {
            const newId = locations.length ? locations[locations.length - 1].flightRouteId + 1 : 1;
            const newLoc = { flightRouteId: newId, location: newLocation };
            setLocations([...locations, newLoc]);
            setNewLocation('');
            setIsAdding(false);
        }
    };

    const handleEditLocation = (index) => {
        setEditIndex(index);
        setEditLocation(locations[index].location);
    };

    const handleUpdateLocation = () => {
        const updatedLocations = locations.map((loc, index) =>
            index === editIndex ? { ...loc, location: editLocation } : loc
        );
        setLocations(updatedLocations);
        setEditIndex(null);
        setEditLocation('');
    };

    const handleDeleteLocation = (index) => {
        const updatedLocations = locations.filter((_, locIndex) => locIndex !== index);
        setLocations(updatedLocations);
    };

    return (
    <div className="max-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full p-6 bg-white rounded-lg shadow-md max-w-full">
            <h1 className="text-2xl font-bold text-center mb-6"><HeroCover>Manage Flight Routes</HeroCover></h1>
            <div className="flex justify-end mb-6">
                <Button
                    label="Add Location"
                    handleClick={() => setIsAdding(true)}
                    containerStyles="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                />
            </div>
            {isAdding && (
                <div className="flex mb-6">
                    <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Enter location name"
                        className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                    />
                    <Button
                        label="Save"
                        handleClick={handleAddLocation}
                        containerStyles="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    />
                    <Button
                        label="Cancel"
                        handleClick={() => setIsAdding(false)}
                        containerStyles="p-2 bg-gray-500 text-white rounded-lg ml-2 hover:bg-gray-600"
                    />
                </div>
            )}
            <ul className="space-y-4">
                {locations.map((location, index) => (
                    <li key={`${location.flightRouteId}-${index}`} className="flex justify-between items-center p-2 border border-gray-300 rounded-lg">
                        {editIndex === index ? (
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    value={editLocation}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                                />
                                <Button
                                    label="Update"
                                    handleClick={handleUpdateLocation}
                                    containerStyles="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                                />
                                <Button
                                    label="Cancel"
                                    handleClick={() => setEditIndex(null)}
                                    containerStyles="p-2 bg-gray-500 text-white rounded-lg ml-2 hover:bg-gray-600"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-1 justify-between items-center">
                                <span className="flex-1">{location.location}</span>
                                <Button
                                    label="Edit"
                                    handleClick={() => handleEditLocation(index)}
                                    containerStyles="p-2 bg-yellow-500 text-white rounded-lg ml-2 hover:bg-yellow-600"
                                />
                                <Button
                                    label="Delete"
                                    handleClick={() => handleDeleteLocation(index)}
                                    containerStyles="p-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600"
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

export default FlightRoutePage;