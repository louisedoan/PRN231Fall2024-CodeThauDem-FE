import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserData, updateUser } from "../lib/api/User";
import { useDispatch, useSelector } from "react-redux";
import { setDetailUser } from "../lib/redux/reducers/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icon mắt
import { initializeWallet, getWalletBalance } from "../utils/walletUltils";

initializeWallet();
const Profile = () => {
  const { id } = useParams(); // Lấy userId từ URL (nếu cần)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.detailUser.data); // Lấy dữ liệu người dùng từ Redux
  const currentUser = useSelector((state) => state.users.currentUser); // Lấy thông tin người dùng hiện tại

  const [profileData, setProfileData] = useState({
    password: "",
    gender: "",
    nationality: "",
    address: "",
    fullname: "",
    dob: "",
    rank: "",
  });
  const [walletBalance, setWalletBalance] = useState(getWalletBalance());
  const [showPassword, setShowPassword] = useState(false); // Thêm trạng thái để quản lý hiển thị mật khẩu
  const [error, setError] = useState("");

  // Lấy thông tin người dùng từ API
  useEffect(() => {
    const userId = id || currentUser?.ID; // Lấy userId từ URL hoặc từ Redux
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
        rank: user.rank || "",
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
    const dobYear = new Date(profileData.dob).getFullYear();

    // Kiểm tra nếu năm sinh không nằm trong khoảng từ 1945 đến 2015
    if (dobYear < 1945 || dobYear > 2015) {
      setError("Ngày sinh phải nằm trong khoảng từ 1945 đến 2015.");
      return;
    }

    const updatedProfileData = {
      userId: user.userId,
      email: user.email,
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
      rank: profileData.rank || user.rank,
      status: user.status,
      role: user.role,
    };

    try {
      console.log("Data to update:", updatedProfileData);
      const updatedUser = await updateUser(updatedProfileData); // Gọi API để cập nhật
      console.log("Updated User:", updatedUser);

      if (!updatedUser || !updatedUser.data) {
        throw new Error("Invalid data received from API");
      }

      alert("Profile updated successfully!");
      const userId = updatedUser.data.userId || currentUser?.ID;
      if (userId) {
        await getUserData(userId);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Đổi trạng thái hiển thị mật khẩu
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex justify-center items-center pt-20 pb-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Profile
        </h2>
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-blue-600">
            Account balance: {walletBalance.toLocaleString()} VND
          </p>
        </div>
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
          <div className="flex items-center relative">
            <label className="block font-semibold text-gray-600 w-1/3">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={profileData.password}
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
              className="block w-2/3 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-4 flex items-center"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Gender */}
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

          {/* Rank */}
          <div className="flex items-center">
            <label className="block font-semibold text-gray-600 w-1/3">
              Rank
            </label>
            <input
              type="text"
              value={profileData.rank}
              disabled
              className="block w-2/3 p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
