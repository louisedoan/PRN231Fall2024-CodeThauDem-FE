import React, { useState } from "react";

const FlightBookingForm = () => {
  const [gender, setGender] = useState("");

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Người lớn</h2>

      {/* Gender Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Giới tính*</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="mr-2"
            />
            Nam
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="mr-2"
            />
            Nữ
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={() => setGender("other")}
              className="mr-2"
            />
            Khác
          </label>
        </div>
      </div>

      {/* Name Fields */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">Họ*</label>
          <input
            type="text"
            placeholder="Theo giấy tờ tùy thân"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">Tên đệm & tên*</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Ngày sinh (DD/MM/YYYY)*</label>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Số điện thoại*</label>
        <div className="flex">
          <div className="flex items-center border border-gray-300 p-2 rounded-l">
            <span className="mr-2">🇻🇳 +84</span>
          </div>
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full border-t border-b border-r border-gray-300 p-2 rounded-r"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email*</label>
        <input
          type="email"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nơi ở hiện tại</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* SkyJoy Member */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nhập mã hội viên SkyJoy</label>
        <input
          type="text"
          placeholder="SJxxxxxxxxxx"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
    </div>
  );
};

export default FlightBookingForm;
