import { useEffect, useState } from "react";
import { ReportSection } from "./components/ReportSection";
import { GetAllFlightReport } from "../../lib/api/Report";
import { ReportDetailModal } from "./ReportDetailModal";

const FlightReportPage = () => {
  const [flightReports, setFlightReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchFlightReports = async () => {
      setLoading(true);
      const response = await GetAllFlightReport();
      console.log(response);
      if (!response.error) {
        const sortedReports = response.data.sort(
          (a, b) => new Date(b.departureTime) - new Date(a.departureTime)
        );
        setFlightReports(sortedReports);
      }
      setLoading(false);
    };
    fetchFlightReports();
  }, []);

  if (loading) return <p>Loading flight reports...</p>;

  return (
    <div className="py-10 flex flex-col overflow-hidden">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold my-5">Flight Report</h1>
      </div>

      {flightReports.slice(0, visibleCount).map((report) => (
        <div
          key={report.orderId}
        >
          <ReportSection
            paymentStatus={report.paymentStatus}
            flightId={report.flightId}
            planeCode={report.planeCode}
            seatNumber={report.seatNumber}
            flightNumber={report.flightNumber}
            departureLocationName={report.departureLocationName}
            arrivalLocationName={report.arrivalLocationName}
            arrivalTime={report.arrivalTime}
            departureTime={report.departureTime}
            flightStatus={report.flightStatus}
            detailBtn={<ReportDetailModal orderId={report.orderId} />}

          />
        </div>
      ))}

      {visibleCount < flightReports.length && (
        <div className="flex justify-center mt-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setVisibleCount(visibleCount + 5)}
          >
            Show More
          </button>
        </div>
      )}

      {/* Render modal with the selected orderId */}
      <div className="hidden">
        {selectedOrderId && <ReportDetailModal orderId={selectedOrderId} />}
      </div>
    </div>
  );
};

export default FlightReportPage;
