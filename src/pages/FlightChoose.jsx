import Container from "../components/ui/Container";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../lib/api/config/axios-client";
const FlightChoose = () => {
  // const flights = [
  //   {
  //     id: 1,
  //     airline: "VietJet Air",
  //     departure: "TP HCM",
  //     arrival: "Hà Nội",
  //     departureTime: "05:20",
  //     arrivalTime: "07:30",
  //     duration: "2h 10m",
  //     prices: {
  //       skyBoss: "2,990,000 VND",
  //       deluxe: "1,490,000 VND",
  //       eco: "790,000 VND",
  //     },
  //     availability: {
  //       business: false,
  //       skyBoss: true,
  //       deluxe: true,
  //       eco: true,
  //     },
      
  //   },
  //   // Add more flight data as needed
  //   {
  //     id: 1,
  //     airline: "VietJet Air",
  //     departure: "TP HCM",
  //     arrival: "Hà Nội",
  //     departureTime: "05:20",
  //     arrivalTime: "07:30",
  //     duration: "2h 10m",
  //     prices: {
  //       skyBoss: "2,990,000 VND",
  //       deluxe: "1,490,000 VND",
  //       eco: "790,000 VND",
  //     },
  //     availability: {
  //       business: false,
  //       skyBoss: true,
  //       deluxe: true,
  //       eco: true,
  //     },
      
  //   },
  //   {
  //     id: 1,
  //     airline: "VietJet Air",
  //     departure: "TP HCM",
  //     arrival: "Hà Nội",
  //     departureTime: "05:20",
  //     arrivalTime: "07:30",
  //     duration: "2h 10m",
  //     prices: {
  //       skyBoss: "2,990,000 VND",
  //       deluxe: "1,490,000 VND",
  //       eco: "790,000 VND",
  //     },
  //     availability: {
  //       business: false,
  //       skyBoss: true,
  //       deluxe: true,
  //       eco: true,
  //     },
      
  //   },
  //   {
  //     id: 1,
  //     airline: "VietJet Air",
  //     departure: "TP HCM",
  //     arrival: "Hà Nội",
  //     departureTime: "05:20",
  //     arrivalTime: "07:30",
  //     duration: "2h 10m",
  //     prices: {
  //       skyBoss: "2,990,000 VND",
  //       deluxe: "1,490,000 VND",
  //       eco: "790,000 VND",
  //     },
  //     availability: {
  //       business: false,
  //       skyBoss: true,
  //       deluxe: true,
  //       eco: true,
  //     },
      
  //   },
  //   {
  //     id: 1,
  //     airline: "VietJet Air",
  //     departure: "TP HCM",
  //     arrival: "Hà Nội",
  //     departureTime: "05:20",
  //     arrivalTime: "07:30",
  //     duration: "2h 10m",
  //     prices: {
  //       skyBoss: "2,990,000 VND",
  //       deluxe: "1,490,000 VND",
  //       eco: "790,000 VND",
  //     },
  //     availability: {
  //       business: false,
  //       skyBoss: true,
  //       deluxe: true,
  //       eco: true,
  //     },
      
  //   },
  //   {
  //     id: 1,
  //     airline: "VietJet Air",
  //     departure: "TP HCM",
  //     arrival: "Hà Nội",
  //     departureTime: "05:20",
  //     arrivalTime: "07:30",
  //     duration: "2h 10m",
  //     prices: {
  //       skyBoss: "2,990,000 VND",
  //       deluxe: "1,490,000 VND",
  //       eco: "790,000 VND",
  //     },
  //     availability: {
  //       business: false,
  //       skyBoss: true,
  //       deluxe: true,
  //       eco: true,
  //     },
      
  //   },
   
  // ];
  const navigate = useNavigate();
  const selectedFlightDetails = useSelector(
    (state) => state.flights.selectedFlightDetails
  );

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!selectedFlightDetails.departureLocation || !selectedFlightDetails.arrivalLocation) {
      // Nếu không có thông tin chuyến bay, quay lại trang đặt chuyến bay
      navigate("/");
      return;
    }

    const fetchFlights = async () => {
      try {
        setLoading(true);
        const params = {
          departureLocation: selectedFlightDetails.departureLocation.location, // Điều chỉnh theo cấu trúc dữ liệu
          arrivalLocation: selectedFlightDetails.arrivalLocation.location,
          departureDate: selectedFlightDetails.departureDate
            ? selectedFlightDetails.departureDate.toISOString().split("T")[0]
            : null,
          returnDate: selectedFlightDetails.isRoundTrip && selectedFlightDetails.returnDate
            ? selectedFlightDetails.returnDate.toISOString().split("T")[0]
            : null,
        };

        // Loại bỏ các tham số null hoặc undefined
        Object.keys(params).forEach(
          (key) => params[key] === null && delete params[key]
        );

        const response = await axiosClient.get("/api/v1/flights/query", { params });
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Đã có lỗi xảy ra khi lấy dữ liệu chuyến bay.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [selectedFlightDetails, navigate]);

  const handleSelectFlight = (flight, classType) => {
    alert(`Bạn đã chọn chuyến bay của ${flight.airline}, Hạng: ${classType}`);
    // Bạn có thể dispatch thêm thông tin chuyến bay đã chọn vào Redux hoặc chuyển hướng đến bước tiếp theo
  };

  if (loading) {
    return <div className="container px-24">Đang tải dữ liệu chuyến bay...</div>;
  }

  if (error) {
    return <div className="container px-24 text-red-500">{error}</div>;
  }

  return (
    <div className="container h-full overflow-y-auto px-24">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Chọn chuyến bay</h2>

      {/* Hàng tiêu đề */}
      <div className="grid grid-cols-3 gap-2 bg-white shadow-lg rounded-lg p-4 mb-6">
        {/* Cột 1 chiếm 1/3 không có nội dung */}
        <div className="col-span-1"></div>

        {/* Cột 2/3 chứa nội dung Business và SkyBoss */}
        <div className="col-span-2 grid grid-cols-2 gap-4 text-center font-semibold text-gray-600">
          <div>Từ:  {selectedFlightDetails.departureLocation.location}  </div>
          <div>Đến: {selectedFlightDetails.arrivalLocation.location} </div>
        </div>
      </div>

      {/* Danh sách các chuyến bay */}
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="bg-white shadow-lg rounded-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="grid grid-cols-3 gap-2">
            {/* Cột Thông tin thời gian */}
            <div className="col-span-1 pr-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-blue-600">{flight.airline}</h3>
                <p className="text-sm text-gray-500">
                {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} 
                {' '} 
                - {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </p>
              </div>
            </div>

            {/* Cột Giá tiền các loại ghế */}
            <div className="col-span-2 grid grid-cols-2 gap-4 text-center">
              <div className="border p-4 rounded-lg">
                <p className="font-semibold text-gray-600">Business</p>
                <p className="text-xl font-bold text-gray-800">{flight.prices}</p>
                <button
                  className="mt-2 w-full bg-gray-300 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  disabled
                >
                  
                </button>
              </div>

              <div className="border p-4 rounded-lg">
                <p className="font-semibold text-gray-600">Economy</p>
                <p className="text-xl font-bold text-red-500">{flight.prices}</p>
                <button
                  className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => handleSelectFlight(flight, "Economy")}
                >
                  Chọn
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightChoose;
