import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = (WrappedComponent, notAllowedRoles = []) => {
  return (props) => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
      if (!currentUser) {
        navigate("/"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      } else if (notAllowedRoles.includes(currentUser.Role)) {
        navigate("/"); // Redirect to home if user role is not allowed
      }
    }, [currentUser, navigate]);

    if (!currentUser || notAllowedRoles.includes(currentUser.Role)) {
      return null; // Render nothing while redirecting
    }

    // Nếu người dùng đã đăng nhập, render component được bọc
    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
