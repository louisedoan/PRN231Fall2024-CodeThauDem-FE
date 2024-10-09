import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../lib/api/User";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.usersList); // Lấy danh sách người dùng từ Redux store
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [expandedRole, setExpandedRole] = useState(null); // Trạng thái để theo dõi Role nào đang mở

  useEffect(() => {
    dispatch(fetchAllUsers()); // Gọi API để lấy danh sách người dùng
  }, [dispatch]);

  // Lấy danh sách các Role duy nhất từ danh sách người dùng
  const roles = [...new Set(usersList.map((user) => user.role))];

  // Xử lý sự kiện khi nhấn vào Role
  const toggleRole = (role) => {
    if (expandedRole === role) {
      setExpandedRole(null); // Đóng nếu đang mở
    } else {
      setExpandedRole(role); // Mở Role được chọn
    }
  };

  // Hàm định dạng lại dob chỉ hiển thị ngày, tháng, năm
  const formatDob = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString("en-GB"); // Định dạng ngày tháng năm kiểu dd/mm/yyyy
  };

  // Hàm xử lý Update và Delete (giả định)
  const handleUpdate = (user) => {
    console.log("Update user:", user);
    // Thêm logic xử lý Update
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
    // Thêm logic xử lý Delete
  };

  // Hàm xử lý tạo Manager (giả định)
  const handleCreateManager = () => {
    console.log("Create Manager button clicked");
    // Thêm logic xử lý Create Manager
  };

  return (
    <div className="min-h-screen p-8">
      {/* Các Role hiển thị theo chiều ngang, với chiều rộng cố định */}
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

      {/* Phần hiển thị người dùng */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {expandedRole && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Users in Role: {expandedRole}
            </h3>

            {/* Nút Create Manager cho role "Manager" */}
            {expandedRole === "Manager" && (
              <button
                onClick={handleCreateManager}
                className="bg-green-500 text-white py-2 px-4 rounded-lg mb-4"
              >
                Create Manager
              </button>
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
                    <th className="text-left py-2 px-4">Actions</th> // Không hiển thị cho Admin
                  )}
                </tr>
              </thead>
              <tbody>
                {usersList
                  .filter((user) => user.role === expandedRole)
                  .map((user) => (
                    <tr key={user.email} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{user.fullname}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.gender}</td>
                      <td className="py-2 px-4">{user.nationality}</td>
                      <td className="py-2 px-4">{user.address}</td>
                      <td className="py-2 px-4">{formatDob(user.dob)}</td>{" "}
                      {/* Định dạng lại dob */}
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
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
