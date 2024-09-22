import { RiArrowDropDownLine } from "react-icons/ri";

const PassengerControl = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  icon,
  passenger,
}) => {
  return (
    <div className="w-full flex overflow-hidden border-2 border-black relative bg-white rounded-2xl font-semibold h-[65px]">
      <div className="flex items-center w-full">
        {/* Icon on the left */}
        {icon && (
          <div className="pl-4 flex items-center justify-center">
            <div className="icon">{icon}</div>
          </div>
        )}

        <div className="flex items-center w-full ml-4">
          <div className="flex flex-col">
            <span className="text-md text-black absolute top-1">{label}</span>
            <span className="text-md text-black mt-4">{passenger}</span>
          </div>
        </div>
      </div>

      <button className="flex p-2 items-center flex-row justify-end ">
        <div className="flex flex-shrink-0 mr-[10px] flex-col font-semibold">
          <RiArrowDropDownLine size={30} />
        </div>
      </button>
    </div>
  );
};
export default PassengerControl;
