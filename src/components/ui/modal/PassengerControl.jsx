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

  // Tăng/giảm số lượng hành khách
  const handleIncrement = (type) => {
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

  // Xử lý khi nhấn vào ô chọn hành khách
  const togglePassengerDropdown = () => {
    setIsPassengerDropdownOpen(!isPassengerDropdownOpen);
  };

  // Đóng dropdown khi click ra ngoài
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
        className="w-full flex items-center border-2 border-black rounded-2xl p-4 cursor-pointer"
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
        <div className="absolute top-full left-0 w-full bg-white border border-black rounded-b-2xl z-20 p-4">
          {/* Người lớn */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold">Người lớn</div>
              <div className="text-sm text-gray-500">12 tuổi trở lên</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border-2 border-black w-8 h-8 flex items-center justify-center rounded"
                onClick={() => handleDecrement("adult")}
              >
                -
              </button>
              <span>{adultCount}</span>
              <button
                className="border-2 border-black w-8 h-8 flex items-center justify-center rounded"
                onClick={() => handleIncrement("adult")}
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
                className="border-2 border-black w-8 h-8 flex items-center justify-center rounded"
                onClick={() => handleDecrement("child")}
              >
                -
              </button>
              <span>{childCount}</span>
              <button
                className="border-2 border-black w-8 h-8 flex items-center justify-center rounded"
                onClick={() => handleIncrement("child")}
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
                className="border-2 border-black w-8 h-8 flex items-center justify-center rounded"
                onClick={() => handleDecrement("infant")}
              >
                -
              </button>
              <span>{infantCount}</span>
              <button
                className="border-2 border-black w-8 h-8 flex items-center justify-center rounded"
                onClick={() => handleIncrement("infant")}
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
