import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPaymentUrl } from "../lib/api/Payment"; // Đường dẫn đúng đến API

export default function PaymentPage() {
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  console.log("Order ID:", orderId);
  console.log("Total Amount:", totalAmount);

  useEffect(() => {
    const handlePayment = async () => {
      const paymentData = {
        orderId: orderId,
        amount: totalAmount,
        paymentMethod: "vnpay",
      };

      console.log("Payment data being sent:", paymentData);

      try {
        const paymentResponse = await createPaymentUrl(paymentData); // Gọi API để tạo thanh toán
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

    handlePayment(); // Gọi hàm thanh toán ngay khi trang được tải
  }, [orderId, totalAmount]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Đang chuyển hướng tới VNPay...
      </h2>
    </div>
  );
}
