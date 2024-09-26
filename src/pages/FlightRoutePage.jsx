import Container from "../components/ui/Container";
import { HeroCover } from "../components/ui/HeroCover";
import React, { useState } from 'react';
import Button from '../components/ui/Button';


const FlightRoutePage = () => {
    const [locations, setLocations] = useState([
        { id: 1, name: 'New York' },
        { id: 2, name: 'Los Angeles' },
        { id: 3, name: 'Chicago' },
    ]);
    const [newLocation, setNewLocation] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editLocation, setEditLocation] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleAddLocation = () => {
        if (newLocation.trim()) {
            const newId = locations.length ? locations[locations.length - 1].id + 1 : 1;
            const newLoc = { id: newId, name: newLocation };
            setLocations([...locations, newLoc]);
            setNewLocation('');
            setIsAdding(false);
        }
    };

    const handleEditLocation = (index) => {
        setEditIndex(index);
        setEditLocation(locations[index].name);
    };

    const handleUpdateLocation = () => {
        const updatedLocations = locations.map((loc, index) =>
            index === editIndex ? { ...loc, name: editLocation } : loc
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
      <div className="w-full">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6"><HeroCover>Manage Flight Routes</HeroCover></h1>
            <div className="flex justify-end mb-6">
                <button class="w-[121px] bg-black h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    onClick={() => setIsAdding(true)}
                >
                    Add Location
                </button>
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
                    <button
                        onClick={handleAddLocation}
                        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsAdding(false)}
                        className="p-2 bg-gray-500 text-white rounded-lg ml-2 hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            )}
            <ul className="space-y-4">
                {locations.map((location, index) => (
                    <li key={location.id} className="flex justify-between items-center p-2 border border-gray-300 rounded-lg">
                        {editIndex === index ? (
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    value={editLocation}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                                />
                                <button
                                    onClick={handleUpdateLocation}
                                    className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => setEditIndex(null)}
                                    className="p-2 bg-gray-500 text-white rounded-lg ml-2 hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-1 justify-between items-center">
                                <span className="flex-1">{location.name}</span>
                                <button
                                    onClick={() => handleEditLocation(index)}
                                    className="p-2  bg-yellow-500 text-white rounded-lg ml-2 hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteLocation(index)}
                                    className="p-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600"
                                >
                                    Delete
                                </button>
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