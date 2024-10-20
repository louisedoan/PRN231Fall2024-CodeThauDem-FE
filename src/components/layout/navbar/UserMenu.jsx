import { MovingBtn } from "../../ui/MovingBtn";
import { IoMdArrowDropdown } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useDispatch } from "react-redux";
import { IoMdNotifications, IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import {
  clearCurrentUser,
  setCurrentUser,
} from "../../../lib/redux/reducers/userSlice";
import { FaPlane } from "react-icons/fa6";

const UserMenu = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ToggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // Check if user is stored in sessionStorage and set it in Redux
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    // Clear user from Redux store
    dispatch(clearCurrentUser());
    setIsOpen(false);
    toast.success("Logout Successful !");
    navigate("/");
  }, [dispatch, navigate]);

  const handleFlightRoute = useCallback(() => {
    navigate("/flight-route");
  }, [navigate]);

  return (
    <div className="relative">
      <div
        onClick={ToggleOpen}
        className="flex flex-row items-center justify-between gap-2"
      >
        <span>Welcome</span>
        <MovingBtn>
          {currentUser.Email} <IoMdArrowDropdown size={25} />
        </MovingBtn>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[12vw] md:w-3/1 bg-white overflow-hidden right-0 top-12 text-sm z-10">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              currentUser.Role === "Staff" ? (
                <>
                  <MenuItem
                    onClick={() => {}}
                    label="Dashboard"
                    icon={<MdDashboard size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Notifications"
                    icon={<IoMdNotifications size={20} />}
                  />
                  <MenuItem
                    onClick={handleLogout}
                    label="Log out"
                    icon={<HiOutlineLogin size={20} />}
                  />
                </>
              ) : currentUser.Role === "Admin" ? (
                <>
                  <MenuItem
                    onClick={() => {}}
                    closeMenu={closeMenu}
                    label="Dashboard"
                    icon={<MdDashboard size={20} />}
                  />
                  <MenuItem
                    onClick={() => navigate("/manage-users")}
                    closeMenu={closeMenu}
                    label="Manage All Users"
                    icon={<MdManageAccounts size={20} />}
                  />
                  <MenuItem
                    onClick={handleFlightRoute}
                    closeMenu={closeMenu}
                    label="Flight Route"
                    icon={<FaPlane size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    closeMenu={closeMenu}
                    label="Notifications"
                    icon={<IoMdNotifications size={20} />}
                  />
                  <MenuItem
                    onClick={handleLogout}
                    closeMenu={closeMenu}
                    label="Log out"
                    icon={<HiOutlineLogin size={20} />}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => navigate(`/profile/${currentUser.ID}`)} // Điều hướng tới trang Profile với userId
                    closeMenu={closeMenu}
                    label="My profile"
                    icon={<CgProfile size={20} />}
                  />
                  <MenuItem
                    onClick={() => navigate(`/history`)}
                    closeMenu={closeMenu}
                    label="My history"
                    icon={<FaHistory size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    closeMenu={closeMenu}
                    label="Notifications"
                    icon={<IoMdNotifications size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    closeMenu={closeMenu}
                    label="Settings"
                    icon={<IoIosSettings size={20} />}
                  />
                  <MenuItem
                    onClick={handleLogout}
                    closeMenu={closeMenu}
                    label="Log out"
                    icon={<HiOutlineLogin size={20} />}
                  />
                </>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
