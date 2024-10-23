import React from "react";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng

export default function OrderDetail({ order, onBack }) {
  const navigate = useNavigate();

  // Chuyển hướng thẳng đến PaymentPage khi nhấn Thanh Toán
  const handlePaymentRedirect = () => {
    navigate("/payment", {
      state: { orderId: order.orderId, totalAmount: order.totalPrice },
    });
  };

  if (!order.orderDetails || !Array.isArray(order.orderDetails)) {
    return <div>Không có chi tiết vé để hiển thị.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Chi Tiết Đơn Hàng: {order.orderId}
      </h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Mã Vé
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Điểm Đến
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Giá</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Trạng Thái
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody>
          {order.orderDetails.map((ticket) => (
            <tr
              key={ticket.orderDetailId}
              className="text-center bg-white hover:bg-gray-100"
            >
              <td className="px-6 py-4 text-sm text-gray-900">
                {ticket.orderDetailId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {ticket.destination || "Không xác định"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {ticket.totalAmount.toLocaleString()} VND
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {ticket.status}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {ticket.status === "Pending" ? (
                  <span className="text-green-500">Có thể thanh toán</span>
                ) : (
                  <span className="text-red-500">Đã thanh toán/hủy</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chuyển hướng thẳng đến PaymentPage khi nhấn Thanh Toán */}
      {order.status === "Pending" && (
        <div className="mt-4">
          <button
            onClick={handlePaymentRedirect}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Thanh Toán
          </button>
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        onClick={onBack}
      >
        Quay Lại
      </button>
    </div>
  );
}
