import {
  FaBook,
  FaHistory,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUserCircle,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { FiBookmark, FiHome } from "react-icons/fi";
import { LuContact } from "react-icons/lu";
import {
  MdOutlineLibraryBooks,
  MdOutlineShoppingBag,
  MdReviews,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/Animation - 1742381715655.json";

const Dashboard = () => {
  // const [cart] = useCart();

  const [isAdmin, isAdminLoading] = useAdmin();

  {
    isAdminLoading && (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="w-24 h-24"
        />
      </div>
    );
  }

  return (
    <div className="flex">
      {/* DASHBOARD SIDE BAR */}
      <div className="w-64 min-h-screen bg-[#FFC300]">
        <ul className="menu w-full text-black">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/additems">
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageitems">
                  <FaList></FaList> Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/managebookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/myprofile">
                  <FaUserCircle />
                  My Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome></FaHome>User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addreview">
                  <MdReviews></MdReviews> Add a Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/mybookings">
                  <FaBookBookmark></FaBookBookmark>My Bookings
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart> My Cart
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymenthistory">
                  <FaHistory></FaHistory> Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/myprofile">
                  <FaUserCircle />
                  My Profile
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          {/* SHARED NAV LINKS */}
          <li>
            <NavLink to="/">
              <FiHome />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/menu">
              <MdOutlineLibraryBooks />
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink to="/orderfood">
              <MdOutlineShoppingBag />
              Order Food
            </NavLink>
          </li>

          <li>
            <NavLink to="/booknow">
              <FiBookmark />
              Book Now
            </NavLink>
          </li>

          <li>
            <NavLink to="https://shuvos-portfolio.netlify.app/">
              <LuContact />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* DASHBOARD CONTENT */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
