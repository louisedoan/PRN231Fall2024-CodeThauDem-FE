import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const passengerInformation = useSelector((state) => state.bookings.passengerInformation);
  const flightBooking = useSelector((state) => state.bookings.flightBooking);
  const flightSeatBooking = useSelector((state) => state.bookings.flightSeatBooking);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

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
    return flightSeatBooking.reduce((total, seat) => total + seat.price, 0);
  };

  return (
    <div className="max-w-6xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="flex">
        {/* Left Side: Passenger and Ticket Information */}
        <div className="w-1/2 pr-4">
          {passengerInformation.length === 0 ? (
            <p className="text-center">No passenger information available.</p>
          ) : (
            passengerInformation.map((passenger, passengerIndex) => (
              <div key={passengerIndex} className="p-6 border rounded-lg bg-gray-100 mb-8">
                <h2 className="text-xl font-semibold mb-2">Passenger: {passenger.name}</h2>
                <p className="mb-1"><strong>Date of Birth:</strong> {formatDate(passenger.dob)}</p>
                <p className="mb-1"><strong>Nationality:</strong> {passenger.nationality}</p>
                <p className="mb-1"><strong>Email:</strong> {passenger.email}</p>

                {/* Ticket Information */}
                <div className="p-4 border rounded-lg bg-white mt-4">
                  <h2 className="text-xl font-semibold mb-2">Ticket Information</h2>
                  <p className="mb-1"><strong>Flight Number:</strong> {flightBooking.flightNumber}</p>
                  <p className="mb-1"><strong>Flight Type:</strong> {flightBooking.isRoundTrip ? "Round Trip" : "One Way Trip"}</p>
                  <p className="mb-1"><strong>Route:</strong> {flightBooking.departureLocation} - {flightBooking.arrivalLocation}</p>
                  <p className="mb-1"><strong>Departure Time:</strong> {formatDateTime(flightBooking.departureTime)}</p>
                  <p className="mb-1"><strong>Arrival Time:</strong> {formatDateTime(flightBooking.arrivalTime)}</p>
                  {flightSeatBooking.length === 0 ? (
                    <p>No seat information available.</p>
                  ) : (
                    <div>
                      <p className="mb-1"><strong>Class:</strong> {flightSeatBooking[passengerIndex].class}</p>
                      <p className="mb-1"><strong>Seat Number:</strong> {flightSeatBooking[passengerIndex].seatNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Cart and Total Price */}
        <div className="w-1/2 pl-4">
          <div className="p-6 border rounded-lg bg-gray-100 mb-6">
            <h2 className="text-xl font-semibold mb-2">Cart</h2>
            {flightSeatBooking.length === 0 ? (
              <p>No price information available.</p>
            ) : (
              flightSeatBooking.map((seat, index) => (
                <p key={index}>{formatPrice(seat.price)}</p>
              ))
            )}
            <h2 className="text-xl font-semibold mb-2">Total Price</h2>
            <p>{formatPrice(calculateTotalPrice())}</p>
          </div>

          <button
            onClick={() => alert("Proceeding to payment...")}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;