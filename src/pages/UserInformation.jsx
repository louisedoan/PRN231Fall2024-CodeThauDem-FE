import React, { useState } from "react";

const UserInformation = () => {
  const [gender, setGender] = useState("");

  const handleGenderChange = (value) => {
    setGender(value);
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Adult</h2>

      {/* Gender Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Gender*</label>
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => handleGenderChange("male")}
              className="mr-2"
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => handleGenderChange("female")}
              className="mr-2"
            />
            Female
          </label>
        </div>
      </div>

      {/* Name Fields */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label className="block mb-2 font-semibold">Last Name*</label>
          <input
            type="text"
            placeholder="As in ID"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-2 font-semibold">First & Middle Name*</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Date of Birth (DD/MM/YYYY)*</label>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Phone Number*</label>
        <div className="flex">
          <div className="flex items-center border border-gray-300 p-2 rounded-l">
            <span className="mr-2">🇻🇳 +84</span>
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border-t border-b border-r border-gray-300 p-2 rounded-r"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Email*</label>
        <input
          type="email"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Address */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Current Address</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
    </div>
  );
};

export default UserInformation;