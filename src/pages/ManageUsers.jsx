import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  createManager,
  deleteUser,
  updateUser,
} from "../lib/api/User";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icon con mắt

const ManageUsers = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.usersList);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [expandedRole, setExpandedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newManagerData, setNewManagerData] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "Female",
    dob: "",
    address: "",
    nationality: "",
    status: "Active",
  });
  const [showPassword, setShowPassword] = useState(false); // Thêm trạng thái hiển thị mật khẩu

  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const roles = [...new Set(usersList.map((user) => user.role))];

  const toggleRole = (role) => {
    if (expandedRole === role) {
      setExpandedRole(null);
    } else {
      setExpandedRole(role);
      setCurrentPage(1);
    }
  };

  const formatDob = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString("en-GB");
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user: ${user.fullname}?`
    );
    if (confirmed) {
      try {
        await deleteUser(user.userId);
        toast.success("User deleted successfully!");
        dispatch(fetchAllUsers());
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    } else {
      toast("Deletion canceled");
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      await updateUser(selectedUser);
      toast.success("User updated successfully!");
      setIsModalOpen(false);
      dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      setNewManagerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreateManager = async () => {
    const isEmailExist = usersList.some(
      (user) => user.email === newManagerData.email
    );
    if (isEmailExist) {
      toast.error("Email already exists. Please use a different email.");
      return;
    }
    try {
      await createManager(newManagerData);
      toast.success("Manager created successfully!");
      setIsModalOpen(false);
      setNewManagerData({
        fullname: "",
        email: "",
        password: "",
        gender: "Female",
        dob: "",
        address: "",
        nationality: "",
        status: "Active",
      });
      dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Error creating manager:", error);
      toast.error("Failed to create manager");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersList
    .filter((user) => user.role === expandedRole)
    .slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(
    usersList.filter((user) => user.role === expandedRole).length / usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen p-8 pt-24 pb-24">
      <div className="flex justify-center mb-4 space-x-4">
        {roles.map((role) => (
          <button
            key={role}
            className={`py-2 px-6 rounded-md w-40 ${
              expandedRole === role
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => toggleRole(role)}
          >
            {role}
          </button>
        ))}
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {expandedRole && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Users in Role: {expandedRole}
            </h3>

            <div className="flex justify-end mb-4">
              {expandedRole === "Manager" && (
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedUser(null);
                  }}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Create Manager
                </button>
              )}
            </div>

            <div className="table-container">
              <table className="w-full bg-white">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4">Full Name</th>
                    <th className="text-left py-2 px-4">Email</th>
                    <th className="text-left py-2 px-4">Gender</th>
                    <th className="text-left py-2 px-4">Nationality</th>
                    <th className="text-left py-2 px-4">Address</th>
                    <th className="text-left py-2 px-4">Date of Birth</th>
                    {expandedRole === "Member" && (
                      <th className="text-left py-2 px-4">Rank</th>
                    )}
                    <th className="text-left py-2 px-4">Status</th>
                    {expandedRole !== "Admin" && (
                      <th className="text-left py-2 px-4">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.email} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{user.fullname}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.gender}</td>
                      <td className="py-2 px-4">{user.nationality}</td>
                      <td className="py-2 px-4">{user.address}</td>
                      <td className="py-2 px-4">{formatDob(user.dob)}</td>
                      {expandedRole === "Member" && (
                        <td className="py-2 px-4">{user.rank || "N/A"}</td>
                      )}
                      <td className="py-2 px-4">{user.status}</td>
                      {expandedRole !== "Admin" && (
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleUpdate(user)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            className="bg-red-500 text-white py-1 px-3 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-2 border rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-2 border rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                Next
              </button>
            </div>

            {isModalOpen && (selectedUser || !selectedUser) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-1/3">
                  <h4 className="text-md font-semibold mb-2">
                    {selectedUser
                      ? "Update User Information"
                      : "Create Manager"}
                  </h4>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="border p-2 mb-2 w-full"
                    value={
                      selectedUser
                        ? selectedUser.fullname
                        : newManagerData.fullname
                    }
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 mb-2 w-full"
                    value={
                      selectedUser ? selectedUser.email : newManagerData.email
                    }
                    onChange={handleChange}
                    disabled={selectedUser}
                  />
                  <div className="relative mb-2">
                    <input
                      type={showPassword ? "text" : "password"} // Thay đổi loại input dựa trên showPassword
                      name="password"
                      placeholder="Password"
                      className="border p-2 w-full"
                      value={
                        selectedUser
                          ? selectedUser.password
                          : newManagerData.password
                      }
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-2 flex items-center"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <select
                    name="gender"
                    className="border p-2 mb-2 w-full"
                    value={
                      selectedUser ? selectedUser.gender : newManagerData.gender
                    }
                    onChange={handleChange}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  <input
                    type="date"
                    name="dob"
                    className="border p-2 mb-2 w-full"
                    value={
                      selectedUser
                        ? selectedUser.dob.substring(0, 10)
                        : newManagerData.dob
                    }
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="border p-2 mb-2 w-full"
                    value={
                      selectedUser
                        ? selectedUser.address
                        : newManagerData.address
                    }
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                    className="border p-2 mb-2 w-full"
                    value={
                      selectedUser
                        ? selectedUser.nationality
                        : newManagerData.nationality
                    }
                    onChange={handleChange}
                  />
                  <select
                    name="status"
                    className="border p-2 mb-2 w-full"
                    value={
                      selectedUser ? selectedUser.status : newManagerData.status
                    }
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {expandedRole === "Member" && (
                    <input
                      type="text"
                      name="rank"
                      placeholder="Rank"
                      className="border p-2 mb-2 w-full"
                      value={selectedUser ? selectedUser.rank || "" : ""}
                      onChange={handleChange}
                    />
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={
                        selectedUser ? handleUpdateSubmit : handleCreateManager
                      }
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                      {selectedUser ? "Submit" : "Create"}
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setNewManagerData({
                          fullname: "",
                          email: "",
                          password: "",
                          gender: "Female",
                          dob: "",
                          address: "",
                          nationality: "",
                          status: "Active",
                        });
                      }}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
