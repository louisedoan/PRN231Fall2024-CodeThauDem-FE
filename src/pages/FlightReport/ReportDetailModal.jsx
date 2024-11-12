import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../../components/ui/AnimatedModal";
import {
  IconUserFilled,
  IconMailFilled,
  IconArmchair2,
  IconPlaneArrival,
  IconPlaneDeparture,
  IconCalendarFilled,
} from "@tabler/icons-react";
import { GetFlighReportById } from "../../lib/api/Report";

// eslint-disable-next-line react/prop-types
export function ReportDetailModal({ orderId }) {
  const [reportDetails, setReportDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  useEffect(() => {
    if (orderId) {
      const fetchReportDetails = async () => {
        setIsLoading(true);
        try {
          const data = await GetFlighReportById(orderId);
          console.log("Full response:", data);
          setReportDetails(data.data);
          console.log(reportDetails);
        } catch (err) {
          setError("Failed to fetch report details");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchReportDetails();
    }
  }, [orderId]);

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Ticket Detail
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Detail
            </h4>
            {isLoading ? (
              <p className="tex-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              reportDetails && (
                <div className="py-10 flex flex-col gap-x-4 gap-y-6 items-start justify-start max-w-sm ">
                  <div className="flex items-center justify-center">
                    <IconUserFilled  className="mr-3 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-white text-xl">
                      Passenger Name : {reportDetails.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <IconMailFilled className="mr-3 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-white text-xl">
                      Email : {reportDetails.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <IconPlaneDeparture className="mr-3 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-white text-xl">
                      Departure locaion : {reportDetails.departureLocationName}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <IconPlaneArrival className="mr-3 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-white text-xl">
                      Arrival Location : {reportDetails.arrivalLocationName}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <IconArmchair2 className="mr-3 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-white text-xl">
                      Seat Number : {reportDetails.seatNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <IconCalendarFilled className="mr-3 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                    <span className="text-white text-xl">
                      Date : {getDate(reportDetails.departureTime)}
                    </span>
                  </div>
                </div>
              )
            )}
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
