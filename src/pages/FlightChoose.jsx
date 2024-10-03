import Container from "../components/ui/Container";
import React from 'react';

const FlightChoose = () => {
  const flights = [
    {
      id: 1,
      airline: "Vietnam Airlines",
      departure: "Hà Nội",
      arrival: "TP HCM",
      departureTime: "08:00",
      arrivalTime: "10:00",
      duration: "2h",
      price: "1,500,000",
    },
    {
      id: 1,
      airline: "Vietnam Airlines",
      departure: "Hà Nội",
      arrival: "TP HCM",
      departureTime: "08:00",
      arrivalTime: "10:00",
      duration: "2h",
      price: "1,500,000",
    },
    {
      id: 1,
      airline: "Vietnam Airlines",
      departure: "Hà Nội",
      arrival: "TP HCM",
      departureTime: "08:00",
      arrivalTime: "10:00",
      duration: "2h",
      price: "1,500,000",
    },
  
    {
      id: 1,
      airline: "Vietnam Airlines",
      departure: "Hà Nội",
      arrival: "TP HCM",
      departureTime: "08:00",
      arrivalTime: "10:00",
      duration: "2h",
      price: "1,500,000",
    },
    {
      id: 1,
      airline: "Vietnam Airlines",
      departure: "Hà Nội",
      arrival: "TP HCM",
      departureTime: "08:00",
      arrivalTime: "10:00",
      duration: "2h",
      price: "1,500,000",
    },
  
  ];

  const handleSelectFlight = (flight, classType) => {
    alert(`Bạn đã chọn chuyến bay của ${flight.airline}, Hạng: ${classType}`);
  };

  return (

    <div className="overflow-y-auto min-h-screen ">
      
<Container>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Chọn chuyến bay</h2>
       
          <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <div className="grid grid-cols-4 gap-4 text-center font-semibold text-gray-600">
              <div>Business</div>
              <div>SkyBoss</div>
              <div>Deluxe</div>
              <div>Eco</div>
            </div>
          </div>

          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white shadow-lg rounded-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-600">{flight.airline}</h3>
                  <p className="text-sm text-gray-500">
                    {flight.departure} → {flight.arrival}
                  </p>
                  <p className="text-sm text-gray-500">
                    {flight.departureTime} - {flight.arrivalTime}
                  </p>
                  <p className="text-sm text-gray-500">Thời gian bay: {flight.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ngày bay: 13 tháng 11</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="border p-4 rounded-lg">
                  <p className="font-semibold text-gray-600">Business</p>
                  <p className="text-xl font-bold text-gray-800">{flight.priceBusiness}</p>
                  <button
                    className="mt-2 w-full bg-gray-300 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Hết chỗ
                  </button>
                </div>

                <div className="border p-4 rounded-lg">
                  <p className="font-semibold text-gray-600">SkyBoss</p>
                  <p className="text-xl font-bold text-red-500">{flight.priceSkyBoss}</p>
                  <button
                    className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleSelectFlight(flight, 'SkyBoss')}
                  >
                    Chọn
                  </button>
                </div>

                <div className="border p-4 rounded-lg">
                  <p className="font-semibold text-gray-600">Deluxe</p>
                  <p className="text-xl font-bold text-yellow-500">{flight.priceDeluxe}</p>
                  <button
                    className="mt-2 w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    onClick={() => handleSelectFlight(flight, 'Deluxe')}
                  >
                    Chọn
                  </button>
                </div>

                <div className="border p-4 rounded-lg">
                  <p className="font-semibold text-gray-600">Eco</p>
                  <p className="text-xl font-bold text-green-500">{flight.priceEco}</p>
                  <button
                    className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    onClick={() => handleSelectFlight(flight, 'Eco')}
                  >
                    Chọn
                  </button>
                </div>
              </div>
            </div>
          ))}
</Container>
      
       
      </div>
     
  );
};

export default FlightChoose;



