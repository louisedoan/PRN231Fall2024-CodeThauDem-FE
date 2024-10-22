import axios from "axios";

const PAYMENT_API_URL = "http://localhost:5176/api/v1/payments";

// API để tạo thanh toán
export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(PAYMENT_API_URL, paymentData);
    return response.data; // Trả về PaymentDTO từ API
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// API xử lý kết quả thanh toán từ VNPay
export const handleVnPayReturn = async (queryParams) => {
  try {
    const response = await axios.get(
      `${PAYMENT_API_URL}/vnpay_return?${queryParams}`
    );
    return response.data; // Trả về kết quả từ VNPay
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
