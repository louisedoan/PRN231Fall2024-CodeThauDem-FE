import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserData, updateUser } from "../lib/api/User"; // Import các API từ User.jsx
import { useSelector } from "react-redux";

const Profile = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const currentUser = useSelector((state) => state.users.currentUser); // Lấy thông tin người dùng từ Redux
  const [profileData, setProfileData] = useState({
    password: "",
    gender: "",
    nationality: "",
    address: "",
    fullname: "",
    dob: "",
  });

  const [error, setError] = useState("");

  // Lấy thông tin người dùng từ API
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(userId);
        setProfileData({
          password: data.password,
          gender: data.gender,
          nationality: data.nationality,
          address: data.address,
          fullname: data.fullname,
          dob: data.dob,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    if (currentUser?.id) {
      getUserData();
    }
  }, [userId, currentUser?.id]);

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = async () => {
    try {
      const updatedUser = await updateUser(userId, profileData); // Gọi API để cập nhật
      setProfileData(updatedUser); // Cập nhật lại dữ liệu trong state
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex justify-center items-center pt-20 pb-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Profile
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Email */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Email
            </label>
            <input
              type="text"
              value={currentUser?.email}
              disabled
              className="block w-2/3 p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Password
            </label>
            <input
              type="password"
              value={profileData.password}
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Gender
            </label>
            <select
              value={profileData.gender}
              onChange={(e) =>
                setProfileData({ ...profileData, gender: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Nationality */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Nationality
            </label>
            <input
              type="text"
              value={profileData.nationality}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  nationality: e.target.value,
                })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Address */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Address
            </label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Full Name */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.fullname}
              onChange={(e) =>
                setProfileData({ ...profileData, fullname: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Date of Birth
            </label>
            <input
              type="date"
              value={profileData.dob?.substring(0, 10)} // Hiển thị chỉ ngày tháng
              onChange={(e) =>
                setProfileData({ ...profileData, dob: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="mt-8 w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
