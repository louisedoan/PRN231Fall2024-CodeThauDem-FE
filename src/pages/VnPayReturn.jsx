import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function VnPayReturn() {
    const query = useQuery();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const location = useLocation();
    const queryString = location.search; // Get the entire query string

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const requestUrl = `http://localhost:5176/api/v1/payments/vnpay_return${queryString}`;
                console.log("Request URL:", requestUrl); // Log the request URL

                const result = await fetch(requestUrl);
                console.log("API Response:", result); // Log the raw response

                if (result.ok) {
                    const contentType = result.headers.get("content-type");
                    console.log("Content-Type:", contentType); // Log the content type

                    if (contentType && contentType.includes("application/json")) {
                        const data = await result.json();
                        console.log("Payment Verification Result (JSON):", data);
                        setPaymentStatus(data);
                    } else {
                        const errorText = await result.text();
                        console.error("Error:", errorText);
                        setPaymentStatus({
                            status: false,
                            message: "Transaction verification failed: Not JSON",
                        });
                    }
                } else {
                    const errorText = await result.text();
                    console.error("Error:", errorText);
                    setPaymentStatus({
                        status: false,
                        message: "Transaction verification failed",
                    });
                }
            } catch (error) {
                console.error("Error verifying transaction:", error);
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
        <div>
            <h1>VNPay Return Page</h1>
            {paymentStatus.status ? (
                <div>
                    <p className="text-green-500">Payment successful!</p>
                    <p>Transaction ID: {paymentStatus.transactionId}</p>
                    <p>Response Code: {paymentStatus.responseCode}</p>
                    <p>Description: {paymentStatus.description}</p>
                    <p>Message: {paymentStatus.message}</p>
                </div>
            ) : (
                <div>
                    <p className="text-red-500">Payment failed: {paymentStatus.message}</p>
                </div>
            )}
        </div>
    );
}

export default VnPayReturn;