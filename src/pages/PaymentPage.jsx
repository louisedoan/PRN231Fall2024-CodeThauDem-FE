import React from "react";
import { useLocation } from "react-router-dom";
import { createPayment } from "../lib/api/Payment"; // Import API để tạo thanh toán

export default function PaymentPage() {
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  console.log("Order ID:", orderId);
  console.log("Total Amount:", totalAmount);

  const handlePayment = async () => {
    const paymentData = {
      orderId: orderId,
      amount: totalAmount,
      paymentMethod: "vnpay",
    };

    console.log("Payment data being sent:", paymentData);

    try {
      const paymentResponse = await createPayment(paymentData); // Gọi API để tạo thanh toán
      console.log("Payment response:", paymentResponse);

      const paymentUrl = paymentResponse.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl; // Chuyển hướng người dùng tới VNPay
      } else {
        console.error("Không tìm thấy URL thanh toán");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Trang Thanh Toán</h2>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Thanh Toán
      </button>
    </div>
  );
}
