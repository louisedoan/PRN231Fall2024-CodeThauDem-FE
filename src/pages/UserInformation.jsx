import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPassengerInformation } from "../lib/redux/reducers/bookingSlice";

const UserInformation = () => {
  const totalPassengers = useSelector((state) => state.bookings.passengerBooking.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passengerInfo, setPassengerInfo] = useState(
    Array(totalPassengers).fill({
      name: "",
      dob: "",
      nationality: "",
      email: "",
    })
  );

  const handleInputChange = (index, field, value) => {
    setPassengerInfo((prevInfo) => {
      const newPassengerInfo = [...prevInfo];
      newPassengerInfo[index] = {
        ...newPassengerInfo[index],
        [field]: value,
      };
      return newPassengerInfo;
    });
  };

  const handleCheckout = () => {
    dispatch(setPassengerInformation(passengerInfo));
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      {Array.from({ length: totalPassengers }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50 mb-6">
          <h2 className="text-2xl font-bold mb-6">Passenger {index + 1}</h2>

          {/* Name Field */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Name*</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Date of Birth (DD/MM/YYYY)*</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].dob.split("/").reverse().join("-")}
              onChange={(e) => handleInputChange(index, "dob", e.target.value)}
            />
          </div>

          {/* Nationality */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Nationality*</label>
            <input
              type="text"
              placeholder="Nationality"
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].nationality}
              onChange={(e) => handleInputChange(index, "nationality", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Email*</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].email}
              onChange={(e) => handleInputChange(index, "email", e.target.value)}
            />
          </div>
        </div>
      ))}
      <button
        onClick={handleCheckout}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
        Checkout
      </button>
    </div>
  );
};

export default UserInformation;