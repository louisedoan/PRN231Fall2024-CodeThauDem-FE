import React from "react";
import axios from "axios";

export default function OrderList({ orders, onViewDetails }) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return <div>Danh sách đơn hàng trống.</div>;
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`/api/cancel-ticket/${orderId}`);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert("Lỗi khi hủy vé: " + error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Mã Đơn Hàng
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Ngày Mua
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Điểm Đi
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Điểm Đến
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Ngày Giờ Bay
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Giờ Check-in
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Trạng Thái
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Tổng Tiền
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            // Tính giờ check-in trước giờ bay 1 tiếng
            const flightDateTime = new Date(order.departureTime);
            const checkinTime = new Date(flightDateTime);
            checkinTime.setHours(checkinTime.getHours() - 1);

            return (
              <tr
                key={order.orderId}
                className="text-center bg-white hover:bg-gray-100"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.departureLocation || "Không xác định"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.arrivalLocation || "Không xác định"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {flightDateTime.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {checkinTime.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.totalPrice.toLocaleString()} VND
                </td>
                <td className="px-6 py-4 flex justify-center space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => onViewDetails(order.orderId)}
                  >
                    Xem Chi Tiết
                  </button>
                  {order.status === "Pending" && (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => handleCancelOrder(order.orderId)}
                    >
                      Hủy Vé
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
