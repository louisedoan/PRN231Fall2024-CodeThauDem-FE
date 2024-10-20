import React from "react";

export default function History() {
  // Dữ liệu mẫu
  const historyData = [
    {
      orderId: "ORD001",
      purchaseDate: "2024-10-10",
      departure: "Hà Nội",
      arrival: "TP.HCM",
      ticketType: "Khứ hồi",
      price: "2,000,000 VND",
    },
    {
      orderId: "ORD002",
      purchaseDate: "2024-09-20",
      departure: "Đà Nẵng",
      arrival: "Phú Quốc",
      ticketType: "Một chiều",
      price: "1,500,000 VND",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Lịch sử Mua Vé Máy Bay
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                Mã Đơn Hàng
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                Ngày Mua
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                Điểm Khởi Hành
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                Điểm Đến
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                Loại Vé
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700 text-center">
                Giá
              </th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr
                key={item.orderId}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {item.orderId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {item.departure}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {item.arrival}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {item.ticketType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
