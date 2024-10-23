import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icon tích xanh và dấu x đỏ

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function VnPayReturn() {
  const query = useQuery();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  const queryString = location.search;

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const requestUrl = `http://localhost:5176/api/v1/payments/vnpay_return${queryString}`;
        const result = await fetch(requestUrl);

        if (result.ok) {
          const contentType = result.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            const data = await result.json();
            setPaymentStatus(data);
          } else {
            const errorText = await result.text();
            setPaymentStatus({
              status: false,
              message: "Transaction verification failed: Not JSON",
            });
          }
        } else {
          const errorText = await result.text();
          setPaymentStatus({
            status: false,
            message: "Transaction verification failed",
          });
        }
      } catch (error) {
        setPaymentStatus({
          status: false,
          message: "Error verifying transaction",
        });
      }
    };

    verifyPayment();
  }, [location]);

  if (!paymentStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Kết quả thanh toán
      </h1>
      {paymentStatus.status ? (
        <div
          style={{
            color: "green",
            fontSize: "2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FaCheckCircle size={100} style={{ marginBottom: "20px" }} />{" "}
          {/* Icon tích xanh lớn hơn và căn giữa */}
          <p>Thanh toán thành công!</p>
        </div>
      ) : (
        <div
          style={{
            color: "red",
            fontSize: "2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FaTimesCircle size={100} style={{ marginBottom: "20px" }} />{" "}
          {/* Icon dấu x đỏ lớn hơn và căn giữa */}
          <p>Thanh toán thất bại: {paymentStatus.message}</p>
        </div>
      )}
    </div>
  );
}

export default VnPayReturn;
