import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, createManager } from "../lib/api/User";
import toast from "react-hot-toast"; // Thêm toast để thông báo

const ManageUsers = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.usersList);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [expandedRole, setExpandedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
  const [newManagerData, setNewManagerData] = useState({
    fullname: "",
    email: "",
    password: "",
    nationality: "",
    address: "",
    gender: "Female",
    status: "Active",
  });

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const usersPerPage = 5; // Số lượng người dùng trên mỗi trang

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const roles = [...new Set(usersList.map((user) => user.role))];

  const toggleRole = (role) => {
    if (expandedRole === role) {
      setExpandedRole(null);
    } else {
      setExpandedRole(role);
      setCurrentPage(1); // Reset lại trang về trang đầu tiên khi đổi role
    }
  };

  const formatDob = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString("en-GB");
  };

  const handleCreateManager = async () => {
    try {
      const response = await createManager({
        ...newManagerData,
        role: "Manager",
      });
      toast.success("Create Manager thành công!");
      setIsModalOpen(false);
      dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Error creating manager:", error);
      toast.error("Error creating Manager");
    }
  };

  // Tính toán các trang cho danh sách người dùng
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
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="min-h-screen p-8">
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

            {expandedRole === "Manager" && (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg mb-4"
                >
                  Create Manager
                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                      <h4 className="text-md font-semibold mb-2">
                        Create New Manager
                      </h4>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="border p-2 mb-2 w-full"
                        value={newManagerData.fullname}
                        onChange={(e) =>
                          setNewManagerData({
                            ...newManagerData,
                            fullname: e.target.value,
                          })
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 mb-2 w-full"
                        value={newManagerData.email}
                        onChange={(e) =>
                          setNewManagerData({
                            ...newManagerData,
                            email: e.target.value,
                          })
                        }
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 mb-2 w-full"
                        value={newManagerData.password}
                        onChange={(e) =>
                          setNewManagerData({
                            ...newManagerData,
                            password: e.target.value,
                          })
                        }
                      />
                      <select
                        className="border p-2 mb-2 w-full"
                        value={newManagerData.gender}
                        onChange={(e) =>
                          setNewManagerData({
                            ...newManagerData,
                            gender: e.target.value,
                          })
                        }
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                      <input
                        type="date"
                        placeholder="Date of Birth"
                        className="border p-2 mb-2 w-full"
                        value={newManagerData.dob}
                        onChange={(e) =>
                          setNewManagerData({
                            ...newManagerData,
                            dob: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        className="border p-2 mb-2 w-full"
                        value={newManagerData.address}
                        onChange={(e) =>
                          setNewManagerData({
                            ...newManagerData,
                            address: e.target.value,
                          })
                        }
                      />
                      <select
                        className="border p-2 mb-2 w-full"
                        value={newManagerData.status}
                        onChange={(e) =>
                          setNewManagerData({
                            ...newManagerData,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleCreateManager}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4">Full Name</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">Gender</th>
                  <th className="text-left py-2 px-4">Nationality</th>
                  <th className="text-left py-2 px-4">Address</th>
                  <th className="text-left py-2 px-4">Date of Birth</th>
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

            {/* Pagination */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
