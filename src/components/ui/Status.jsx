const ActionStatus = ({ status }) => {
  let statusClass;
  let label;

  switch (status) {
    case "Success":
      statusClass = "bg-green-500";
      label = "Success";
      break;
    case "Pending":
      statusClass = "bg-yellow-500";
      label = "Pending";
      break;
    case "Available":
      statusClass = "bg-blue-500";
      label = "Available";
      break;
    case "Cancel":
      statusClass = "bg-red-500";
      label = "Canceled";
    break;

    case "Rejected":
      statusClass = "bg-red-500";
      label = "Rejected";

      break;
    default:
      statusClass = "bg-gray-500";
      label = "Unknown";
  }
  return (
    <span
      className={`text-sm  me-2 px-2.5 py-2.5 rounded ms-3 font-bold ${statusClass}`}
    >
      {label}
    </span>
  );
};
export default ActionStatus;
