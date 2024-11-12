import { useEffect, useState } from "react";
import { ReportSection } from "./components/ReportSection";
import { GetAllFlightReport } from "../../lib/api/Report";
import { ReportDetailModal } from "./ReportDetailModal";

const FlightReportPage = () => {
  const [flightReports, setFlightReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchFlightReports = async () => {
      setLoading(true);
      const response = await GetAllFlightReport();
      console.log(response);
      if (!response.error) {
        setFlightReports(response.data);
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

      {flightReports.map((report) => (
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

      {/* Render modal with the selected orderId */}
      <div className="hidden">
        {selectedOrderId && <ReportDetailModal orderId={selectedOrderId} />}
      </div>
    </div>
  );
};

export default FlightReportPage;
