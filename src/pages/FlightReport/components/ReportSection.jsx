import { IconPlane } from "@tabler/icons-react";
import ActionStatus from "../../../components/ui/Status";

export const ReportSection = ({
  paymentStatus,
  flightId,
  planeCode,
  flightNumber,
  departureLocationName,
  arrivalLocationName,
  arrivalTime,
  departureTime,
  flightStatus,
}) => {
  const getHours = (dateTime) => {
    const date = new Date(dateTime);
    return date.getHours().toString().padStart(2, "0") + ":00"; // Format as HH:00
  };

  const getDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return (
    <div className="">
      <div className="w-full flex-grow bg-transparent flex items-center justify-center p-4">
        <div className="flex w-full max-w-3xl text-zinc-50 h-64">
          <div className="h-full bg-zinc-900 flex items-center justify-center px-8 rounded-l-3xl">
            <div className="flex flex-col items-center gap-4">
              <p>Payment status</p>
              <ActionStatus status={paymentStatus} />
            </div>
          </div>
          <div className="relative h-full flex flex-col items-center border-dashed justify-between border-2 bg-zinc-900 border-zinc-50">
            <div className="absolute rounded-full w-8 h-8 bg-transparent -top-5"></div>
            <div className="absolute rounded-full w-8 h-8 bg-transparent -top-5"></div>
          </div>
          <div className="h-full py-8 px-10 bg-zinc-900 flex-grow rounded-r-3xl flex flex-col">
            <div className="flex w-full justify-between items-center">
              <span className="flex flex-col items-center">
                <p className="text-4xl font-bold pt-7">
                  {departureLocationName}
                </p>
              </span>
              <div className="flex flex-col flex-grow items-center px-10">
                <p className="font-bold text-xs">FlightNo : {flightNumber}</p>
                <div className="w-full flex items-center mt-5">
                  <div className="w-3 h-3 rounded-full border-2 border-zinc-900"></div>
                  <div className="flex-grow border-t-2 border-zinc-400 border-dotted h-px"></div>
                  <IconPlane size={25} className="mx-2" />
                  <div className="flex-grow border-t-2 border-zinc-400 border-dotted h-px"></div>
                  <div className="w-3 h-3 rounded-full border-2 border-zinc-900"></div>
                </div>
              </div>
              <span className="flex flex-col items-center">
                <p className="text-4xl font-bold pt-7">{arrivalLocationName}</p>
              </span>
            </div>
            <div className="flex w-full mt-auto justify-between items-center">
              <span className="flex flex-col">
                <p className="text-xs text-zinc-400">Departure date</p>
                <p className="font-mono">{getHours(departureTime)}</p>
              </span>
              <span className="flex flex-col">
                <p className="text-xs text-zinc-400">Arrival date</p>
                <p className="font-mono">{getHours(arrivalTime)}</p>
              </span>
              <span className="flex flex-col">
                <p className="text-xs text-zinc-400">Date</p>
                <p className="font-mono">{getDate(arrivalTime)}</p>
              </span>
              <span className="flex flex-col gap-3">
                <p className="text-xs text-zinc-400 ml-3">Flight Status</p>
                <p className="font-mono">
                  <ActionStatus status={flightStatus} />
                </p>
              </span>
              <span className="flex flex-col">
                <p className="text-xs text-zinc-400"></p>
                <p className="font-mono"></p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
