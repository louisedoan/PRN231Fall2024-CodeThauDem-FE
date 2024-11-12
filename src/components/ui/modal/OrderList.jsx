import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderList({ orders, onViewDetails }) {
  const navigate = useNavigate();

  const handlePaymentClick = (order) => {
    navigate("/payment", {
      state: { orderId: order.orderId, totalAmount: order.totalPrice },
    });
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `/api/v1/orderdetails/cancel/${orderId}`
      );
      console.log(response);

      alert(response);
      window.location.reload();
    } catch (error) {
      alert("Lỗi khi hủy vé");
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
          {orders.map((order) => (
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
                {order.departureTime}
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
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => handlePaymentClick(order)}
                  >
                    Thanh Toán
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
