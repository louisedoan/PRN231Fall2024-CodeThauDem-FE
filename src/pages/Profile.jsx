import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserData, updateUser } from "../lib/api/User";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { id } = useParams(); // Lấy userId từ URL
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.detailUser.data);
  const currentUser = useSelector((state) => state.users.currentUser); // Lấy thông tin người dùng từ Redux

  const [profileData, setProfileData] = useState({
    password: "",
    gender: "",
    nationality: "",
    address: "",
    fullname: "",
    dob: "",
    membershipId: "", // Thêm membershipId vào state
  });

  const [error, setError] = useState("");

  // Lấy thông tin người dùng từ API
  useEffect(() => {
    const userId = id || currentUser?.ID;
    if (userId) {
      getUserData(userId);
    }
  }, [id, currentUser]);

  // Khởi tạo profileData từ user khi dữ liệu đã được tải
  useEffect(() => {
    if (user) {
      setProfileData({
        password: user.password || "",
        gender: user.gender || "",
        nationality: user.nationality || "",
        address: user.address || "",
        fullname: user.fullname || "",
        dob: user.dob ? user.dob.substring(0, 10) : "",
        membershipId: user.membershipId || "", // Lấy membershipId từ user
      });
    }
  }, [user]);

  const getUserData = async (userId) => {
    try {
      await dispatch(fetchUserData(userId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = async () => {
    const updatedProfileData = {
      password:
        profileData.password !== "string" && profileData.password !== ""
          ? profileData.password
          : user.password,
      gender:
        profileData.gender !== "string" && profileData.gender !== ""
          ? profileData.gender
          : user.gender,
      nationality:
        profileData.nationality !== "string" && profileData.nationality !== ""
          ? profileData.nationality
          : user.nationality,
      address:
        profileData.address !== "string" && profileData.address !== ""
          ? profileData.address
          : user.address,
      fullname:
        profileData.fullname !== "string" && profileData.fullname !== ""
          ? profileData.fullname
          : user.fullname,
      dob:
        profileData.dob !== "string" && profileData.dob !== ""
          ? profileData.dob
          : user.dob,
      membershipId:
        profileData.membershipId !== "string" && profileData.membershipId !== ""
          ? profileData.membershipId
          : user.membershipId, // Thêm membershipId vào dữ liệu cập nhật
    };

    try {
      console.log("Data to update:", updatedProfileData);
      await updateUser(currentUser?.ID, updatedProfileData); // Gọi API để cập nhật
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>{error}</p>;

  if (!user) {
    return <p>Loading...</p>;
  }

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
              value={user.email || ""}
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

          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Gender
            </label>
            <select
              value={profileData.gender !== "string" ? profileData.gender : ""}
              onChange={(e) =>
                setProfileData({ ...profileData, gender: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
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
                setProfileData({ ...profileData, nationality: e.target.value })
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
              value={profileData.dob}
              onChange={(e) =>
                setProfileData({ ...profileData, dob: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Membership ID */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Membership ID
            </label>
            <input
              type="text"
              value={profileData.membershipId} // Hiển thị membershipId từ profileData
              onChange={(e) =>
                setProfileData({ ...profileData, membershipId: e.target.value })
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
