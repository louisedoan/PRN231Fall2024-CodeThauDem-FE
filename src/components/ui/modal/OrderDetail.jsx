import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../lib/api/config/axios-client";

export default function OrderDetail({ order, onBack }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const navigate = useNavigate();

  if (!order.orderDetails || !Array.isArray(order.orderDetails)) {
    return (
      <div className="text-center mt-4">Không có chi tiết vé để hiển thị.</div>
    );
  }

  const handlePaymentClick = (ticket) => {
    navigate("/payment", {
      state: { orderId: ticket.orderDetailId, totalAmount: ticket.totalAmount },
    });
  };

  const handleCancelClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    setShowConfirmModal(true);
  };

  const handleCancelTicket = async () => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/orderdetails/cancel/${selectedTicketId}`
      );
      console.log(response);
      if (response.status === 200) {
        alert("Vé đã được hủy thành công.");
        window.location.reload();
      } else {
        alert("Không thể hủy vé vào lúc này.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert("Lỗi khi hủy vé: " + error.response.data.message);
      } else {
        alert("Lỗi không xác định khi hủy vé.");
      }
    } finally {
      setShowConfirmModal(false);
      setSelectedTicketId(null);
    }
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setSelectedTicketId(null);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Chi Tiết Đơn Hàng: {order.orderId}
      </h2>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="px-4 py-2 text-sm font-medium text-gray-700">
              Mã Vé
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">
              Điểm Đi
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">
              Điểm Đến
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">Giá</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">
              Trạng Thái
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700">
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody>
          {order.orderDetails.map((ticket) => (
            <tr
              key={ticket.orderDetailId}
              className="text-center bg-white hover:bg-gray-100 transition"
            >
              <td className="px-4 py-2 text-sm text-gray-900">
                {ticket.ticketCode}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {order.departureLocation || "Không xác định"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {order.arrivalLocation || "Không xác định"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {ticket.totalAmount?.toLocaleString()} VND
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {ticket.status}
              </td>
              <td className="px-4 py-2">
                {ticket.status === "Pending" ? (
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => handlePaymentClick(ticket)}
                  >
                    Thanh Toán
                  </button>
                ) : ticket.status === "Success" ? (
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleCancelClick(ticket.orderDetailId)}
                  >
                    Hủy Vé
                  </button>
                ) : (
                  <span className="text-gray-500">Không thể thao tác</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          onClick={onBack}
        >
          Quay Lại
        </button>
      </div>

      {/* Modal Xác Nhận Hủy Vé */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Xác nhận hủy vé</h3>
            <p>Bạn có chắc chắn muốn hủy vé này không?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                onClick={closeModal}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={handleCancelTicket}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
