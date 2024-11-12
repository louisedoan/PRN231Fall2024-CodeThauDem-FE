import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentUrl } from "../lib/api/Payment";

const Checkout = () => {
  const dispatch = useDispatch();
  const passengerInformation = useSelector((state) => state.bookings.passengerInformation);
  const flightBooking = useSelector((state) => state.bookings.flightBooking);
  const returnFlightBooking = useSelector((state) => state.bookings.returnFlightBooking);
  const flightSeatBooking = useSelector((state) => state.bookings.flightSeatBooking);
  const returnFlightSeatBooking = useSelector((state) => state.bookings.returnFlightSeatBooking);
  const orderId = useSelector((state) => state.bookings.orderId);
  const isRoundTrip = !!returnFlightBooking.flightId;

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const calculateTotalPrice = () => {
    const goTicketPrice = flightSeatBooking.reduce((total, seat) => total + seat.price, 0);
    const returnTicketPrice = isRoundTrip ? returnFlightSeatBooking.reduce((total, seat) => total + seat.price, 0) : 0;
    return goTicketPrice + returnTicketPrice;
  };

  const handlePurchase = async () => {
    try {
      const paymentData = { orderId: orderId };
      const response = await createPaymentUrl(paymentData);
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        alert("Failed to create payment URL. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment URL:", error);
      alert("Failed to create payment URL. Please try again.");
    }
  };

  return (
    <div className="checkout-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h2>

      <div className="flex flex-col md:flex-row">
        {/* Left Side: Ticket Details */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-4">
          <div className="ticket-section bg-blue-50 p-4 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Go Ticket</h3>
            <div className="ticket-details text-gray-700">
              <p><strong>Flight Number:</strong> {flightBooking.flightNumber}</p>
              <p><strong>Departure:</strong> {flightBooking.departureLocation} at {formatDateTime(flightBooking.departureTime)}</p>
              <p><strong>Arrival:</strong> {flightBooking.arrivalLocation} at {formatDateTime(flightBooking.arrivalTime)}</p>
              <p><strong>Class:</strong> {flightBooking.classType}</p>
              <p><strong>Price:</strong> {formatPrice(flightSeatBooking.reduce((total, seat) => total + seat.price, 0))} x {passengerInformation.length} passengers</p>
              <div className="seat-details mt-4">
                <h4 className="font-semibold text-red-600">Seat Details</h4>
                {flightSeatBooking.map((seat, index) => (
                  <div key={index} >
                    <p><strong>Class:</strong> {seat.class}</p>
                    <p><strong>Seat Number:</strong> {seat.seatNumber}</p>
                    <p><strong>Price:</strong> {formatPrice(seat.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isRoundTrip && (
            <div className="ticket-section bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">Return Ticket</h3>
              <div className="ticket-details text-gray-700">
                <p><strong>Flight Number:</strong> {returnFlightBooking.flightNumber}</p>
                <p><strong>Departure:</strong> {returnFlightBooking.departureLocation} at {formatDateTime(returnFlightBooking.departureTime)}</p>
                <p><strong>Arrival:</strong> {returnFlightBooking.arrivalLocation} at {formatDateTime(returnFlightBooking.arrivalTime)}</p>
                <p><strong>Class:</strong> {returnFlightBooking.classType}</p>
                <p><strong>Price:</strong> {formatPrice(returnFlightSeatBooking.reduce((total, seat) => total + seat.price, 0))} x {passengerInformation.length} passengers</p>
                <div className="seat-details mt-4">
                  <h4 className="font-semibold text-red-600">Seat Details:</h4>
                  {returnFlightSeatBooking.map((seat, index) => (
                    <div key={index} >
                      <p><strong>Class:</strong> {seat.class}</p>
                      <p><strong>Seat Number:</strong> {seat.seatNumber}</p>
                      <p><strong>Price:</strong> {formatPrice(seat.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Cart and Total Price */}
        <div className="md:w-1/2 md:pl-4">
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cart Summary</h2>
            <div className="text-gray-700">
              <p><strong>Go Ticket:</strong> {formatPrice(flightSeatBooking.reduce((total, seat) => total + seat.price, 0))}</p>
              {isRoundTrip && (
                <p><strong>Return Ticket:</strong> {formatPrice(returnFlightSeatBooking.reduce((total, seat) => total + seat.price, 0))}</p>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">Total Price</h2>
            <p className="text-gray-700">{formatPrice(calculateTotalPrice())}</p>
          </div>

          <button
            onClick={handlePurchase}
            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;