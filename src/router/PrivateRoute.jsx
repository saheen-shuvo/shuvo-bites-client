/* eslint-disable react/prop-types */

import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/Animation - 1742381715655.json";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
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

  if (user) {
    return children;
  }

  return <Navigate to="/signin" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;
