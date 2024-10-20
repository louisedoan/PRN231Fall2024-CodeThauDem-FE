import React from "react";

export default function OrderDetail({ order, onBack }) {
  // Kiểm tra nếu orderDetails không phải là mảng hoặc không tồn tại
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
                  <span className="text-green-500">Có thể thanh toán/hủy</span>
                ) : (
                  <span className="text-red-500">Đã thanh toán/hủy</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        onClick={onBack}
      >
        Quay Lại
      </button>
    </div>
  );
}
