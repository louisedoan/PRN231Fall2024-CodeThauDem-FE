import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function VnPayReturn() {
  const [paymentResult, setPaymentResult] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const txnRef = query.get("vnp_TxnRef");
    const responseCode = query.get("vnp_ResponseCode");
    const secureHash = query.get("vnp_SecureHash");

    const verifyPayment = async (txnRef, responseCode, secureHash) => {
      try {
        const result = await fetch(
          `/api/v1/payments/vnpay_return?txnRef=${txnRef}&responseCode=${responseCode}&secureHash=${secureHash}`
        );

        if (result.ok) {
          const data = await result.json();
          console.log("Payment Verification Result:", data);
          setPaymentResult(data);
        } else {
          const errorText = await result.text();
          console.error("Error:", errorText);
          setPaymentResult({
            status: "fail",
            message: "Lỗi xác minh giao dịch",
          });
        }
      } catch (error) {
        console.error("Lỗi khi xác minh giao dịch:", error);
        setPaymentResult({
          status: "fail",
          message: "Lỗi khi xác minh giao dịch",
        });
      }
    };

    verifyPayment(txnRef, responseCode, secureHash);
  }, [location]);

  return (
    <div>
      <h1>VNPay Return Page</h1>
      {paymentResult ? (
        paymentResult.status === "success" ? (
          <p className="text-green-500">Thanh toán thành công!</p>
        ) : (
          <p className="text-red-500">
            Thanh toán thất bại: {paymentResult.message}
          </p>
        )
      ) : (
        <p>Đang xử lý phản hồi từ VNPay...</p>
      )}
    </div>
  );
}
