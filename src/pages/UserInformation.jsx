import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setPassengerInformation,
  setOrderId,
} from "../lib/redux/reducers/bookingSlice";
import { createOrder } from "../lib/api/Order";
const countries = [
  "VietNam",
  "America",
  "Japan",
  "China",
  "Russia",
  "Germany",
  "France",
  "UnitedKingdom",
  "India",
  "Brazil",
  "Canada",
  "Australia",
];

const UserInformation = () => {
  const totalPassengers = useSelector(
    (state) => state.bookings.passengerBooking.total
  );
  const flightBooking = useSelector((state) => state.bookings.flightBooking);
  const returnFlightBooking = useSelector(
    (state) => state.bookings.returnFlightBooking
  );
  const flightSeatBooking = useSelector(
    (state) => state.bookings.flightSeatBooking
  );
  const returnFlightSeatBooking = useSelector(
    (state) => state.bookings.returnFlightSeatBooking
  );
  const selectedFlightDetails = useSelector(
    (state) => state.flights.selectedFlightDetails
  );
  const isRoundTrip = selectedFlightDetails.isRoundTrip;
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passengerInfo, setPassengerInfo] = useState(
    Array(totalPassengers).fill({
      name: "",
      dob: "",
      nationality: "",
      email: "",
    })
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (index, field, value) => {
    setPassengerInfo((prevInfo) => {
      const newPassengerInfo = [...prevInfo];
      newPassengerInfo[index] = {
        ...newPassengerInfo[index],
        [field]: value,
      };
      return newPassengerInfo;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    passengerInfo.forEach((passenger, index) => {
      if (!passenger.name) {
        newErrors[`name${index}`] = "Name is required.";
      }
      if (!passenger.dob) {
        newErrors[`dob${index}`] = "Date of birth is required.";
      } else {
        const dob = new Date(passenger.dob);
        if (dob < new Date("1900-01-01") || dob > new Date("2024-12-31")) {
          newErrors[`dob${index}`] =
            "Date of birth must be between 1900 and 2024.";
        }
      }
      if (!passenger.nationality) {
        newErrors[`nationality${index}`] = "Nationality is required.";
      }
      if (!passenger.email) {
        newErrors[`email${index}`] = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(passenger.email)) {
        newErrors[`email${index}`] = "Email is invalid.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    dispatch(setPassengerInformation(passengerInfo));

    const orderCreate = {
      orderId: 0,
      userId: currentUser?.ID || null,
      orderDate: new Date().toISOString(),
      status: "Pending",
      totalPrice:
        flightSeatBooking.reduce((total, seat) => total + seat.price, 0) +
        (isRoundTrip
          ? returnFlightSeatBooking.reduce(
              (total, seat) => total + seat.price,
              0
            )
          : 0),
      orderDetails: passengerInfo.flatMap((passenger, index) => {
        const details = [
          {
            orderDetailId: 0,
            name: passenger.name,
            doB: new Date(passenger.dob).toISOString(),
            nationality: passenger.nationality,
            email: passenger.email,
            flightId: flightBooking.flightId,
            tripType: "One Way Trip",
            seatId: flightSeatBooking[index].seatId,
            status: "Pending",
            totalAmount: flightSeatBooking[index].price,
            ticketCode: "",
          },
        ];
        if (isRoundTrip) {
          details.push({
            orderDetailId: 0,
            name: passenger.name,
            doB: new Date(passenger.dob).toISOString(),
            nationality: passenger.nationality,
            email: passenger.email,
            flightId: returnFlightBooking.flightId,
            tripType: "Round Trip",
            seatId: returnFlightSeatBooking[index].seatId,
            status: "Pending",
            totalAmount: returnFlightSeatBooking[index].price,
            ticketCode: "",
          });
        }
        return details;
      }),
      passengers: passengerInfo.flatMap((passenger, index) => {
        const passengers = [
          {
            name: passenger.name,
            doB: new Date(passenger.dob).toISOString(),
            nationality: passenger.nationality,
            email: passenger.email,
            flightId: flightBooking.flightId,
            tripType: "One Way Trip",
            seatId: flightSeatBooking[index].seatId,
            price: flightSeatBooking[index].price,
          },
        ];
        if (isRoundTrip) {
          passengers.push({
            name: passenger.name,
            doB: new Date(passenger.dob).toISOString(),
            nationality: passenger.nationality,
            email: passenger.email,
            flightId: returnFlightBooking.flightId,
            tripType: "Round Trip",
            seatId: returnFlightSeatBooking[index].seatId,
            price: returnFlightSeatBooking[index].price,
          });
        }
        return passengers;
      }),
    };
    console.log("Order Data:", orderCreate);

    try {
      const orderResponse = await createOrder(orderCreate);
      console.log("Order Response:", orderResponse); // Log the order response for debugging
      const isSuccess = orderResponse.isSuccess || false;
      const message =
        orderResponse.message || "Failed to create order. Please try again.";
      setMessage(message);
      setMessageType(isSuccess ? "success" : "error");
      if (isSuccess) {
        const rankMatch = message.match(/rank is (\w+)/);
        const discountMatch = message.match(/discount is (\d+)%/);
        const rank = rankMatch ? rankMatch[1] : "Unknown";
        const discount = discountMatch ? parseInt(discountMatch[1], 10) : 0;

        dispatch(setOrderId(orderResponse.data.orderId));
        navigate("/checkout", {
          state: { order: orderResponse.result, rank, discount },
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      if (error.message) {
        setMessage(error.message);
      } else {
        setMessage("Failed to create order. Please try again.");
      }
      setMessageType("error");
    }
  };

  return (
    <div className="max-w-full p-6 mx-auto overflow-auto bg-white rounded-lg shadow-md ">
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      {Array.from({ length: totalPassengers }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50 mb-6">
          <h2 className="text-2xl font-bold mb-6">Passenger {index + 1}</h2>

          {/* Name Field */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Name*</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
            {errors[`name${index}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`name${index}`]}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Date of Birth (DD/MM/YYYY)*
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].dob.split("/").reverse().join("-")}
              onChange={(e) => handleInputChange(index, "dob", e.target.value)}
              min="1900-01-01"
              max="2024-12-31"
            />
            {errors[`dob${index}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`dob${index}`]}
              </p>
            )}
          </div>

          {/* Nationality */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Nationality*</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].nationality}
              onChange={(e) =>
                handleInputChange(index, "nationality", e.target.value)
              }
            >
              <option value="">Select Nationality</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors[`nationality${index}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`nationality${index}`]}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Email*</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-2 rounded"
              value={passengerInfo[index].email}
              onChange={(e) =>
                handleInputChange(index, "email", e.target.value)
              }
            />
            {errors[`email${index}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`email${index}`]}
              </p>
            )}
          </div>
        </div>
      ))}
      <button
        onClick={handleCheckout}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Checkout
      </button>
    </div>
  );
};

export default UserInformation;
