/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/Animation - 1742381715655.json"

const AdminRoute = ({ children }) => {
  const {user, loading} = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="w-24 h-24"
      />
    </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
