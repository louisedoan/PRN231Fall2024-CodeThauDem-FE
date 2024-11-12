import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";

const PassengerControl = ({
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infantCount,
  setInfantCount,
}) => {
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const passengerDropdownRef = useRef(null);
  const maxTotalTickets = 10;

  // Calculate total tickets
  const totalTickets = adultCount + childCount + infantCount;

  const handleIncrement = (type) => {
    if (totalTickets >= maxTotalTickets) return; // Prevent increment if total is 10 or more

    switch (type) {
      case "adult":
        setAdultCount(adultCount + 1);
        break;
      case "child":
        setChildCount(childCount + 1);
        break;
      case "infant":
        setInfantCount(infantCount + 1);
        break;
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case "adult":
        if (adultCount > 1) setAdultCount(adultCount - 1);
        break;
      case "child":
        if (childCount > 0) setChildCount(childCount - 1);
        break;
      case "infant":
        if (infantCount > 0) setInfantCount(infantCount - 1);
        break;
      default:
        break;
    }
  };

  const togglePassengerDropdown = () => {
    setIsPassengerDropdownOpen(!isPassengerDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        passengerDropdownRef.current &&
        !passengerDropdownRef.current.contains(event.target)
      ) {
        setIsPassengerDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full mb-4" ref={passengerDropdownRef}>
      <div
        className={`w-full flex items-center border-2 ${
          isPassengerDropdownOpen ? "border-yellow-500" : "border-gray-300"
        } rounded-2xl p-4 cursor-pointer transition duration-300`}
        onClick={togglePassengerDropdown}
      >
        <FaUser size={25} />
        <input
          type="text"
          value={`${adultCount} người lớn, ${childCount} trẻ em, ${infantCount} em bé`}
          className="w-full ml-4 outline-none bg-transparent"
          readOnly
        />
      </div>

      {isPassengerDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-2xl z-20 p-4 shadow-lg">
          {/* Người lớn */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold">Người lớn</div>
              <div className="text-sm text-gray-500">12 tuổi trở lên</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border-2 border-gray-300 w-8 h-8 flex items-center justify-center rounded shadow-sm transition duration-200"
                onClick={() => handleDecrement("adult")}
                disabled={adultCount <= 1}
              >
                -
              </button>
              <span>{adultCount}</span>
              <button
                className="border-2 border-gray-300 w-8 h-8 flex items-center justify-center rounded shadow-sm transition duration-200"
                onClick={() => handleIncrement("adult")}
                disabled={totalTickets >= maxTotalTickets}
              >
                +
              </button>
            </div>
          </div>

          {/* Trẻ em */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold">Trẻ em</div>
              <div className="text-sm text-gray-500">2-11 tuổi</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border-2 border-gray-300 w-8 h-8 flex items-center justify-center rounded shadow-sm transition duration-200"
                onClick={() => handleDecrement("child")}
                disabled={childCount <= 0}
              >
                -
              </button>
              <span>{childCount}</span>
              <button
                className="border-2 border-gray-300 w-8 h-8 flex items-center justify-center rounded shadow-sm transition duration-200"
                onClick={() => handleIncrement("child")}
                disabled={totalTickets >= maxTotalTickets}
              >
                +
              </button>
            </div>
          </div>

          {/* Em bé */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Em bé</div>
              <div className="text-sm text-gray-500">Dưới 2 tuổi</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border-2 border-gray-300 w-8 h-8 flex items-center justify-center rounded shadow-sm transition duration-200"
                onClick={() => handleDecrement("infant")}
                disabled={infantCount <= 0}
              >
                -
              </button>
              <span>{infantCount}</span>
              <button
                className="border-2 border-gray-300 w-8 h-8 flex items-center justify-center rounded shadow-sm transition duration-200"
                onClick={() => handleIncrement("infant")}
                disabled={totalTickets >= maxTotalTickets}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerControl;
