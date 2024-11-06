import { useEffect, useState } from "react";
import { ReportSection } from "./components/ReportSection";
import { GetAllFlightReport } from "../../lib/api/Report";

const FlightReportPage = () => {
  const [flightReports, setFlightReports] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <ReportSection
          key={report.flightId}
          paymentStatus={report.paymentStatus}
          flightId={report.flightId}
          planeCode={report.planeCode}
          flightNumber={report.flightNumber}
          departureLocationName={report.departureLocationName}
          arrivalLocationName={report.arrivalLocationName}
          arrivalTime={report.arrivalTime}
          departureTime={report.departureTime}
          flightStatus={report.flightStatus}
        />
      ))}
    </div>
  );
};

export default FlightReportPage;
