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

  return (
    <div className="min-h-screen p-8">
      {/* Các Role hiển thị theo chiều ngang */}
      <div className="flex space-x-4 mb-4">
        {roles.map((role) => (
          <button
            key={role}
            className={`py-2 px-4 rounded-md ${
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
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4">Full Name</th>
                  <th className="text-left py-2 px-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {usersList
                  .filter((user) => user.role === expandedRole)
                  .map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{user.fullname}</td>
                      <td className="py-2 px-4">{user.email}</td>
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
