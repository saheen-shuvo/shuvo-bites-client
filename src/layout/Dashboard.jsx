import {
  FaBook,
  FaCalendar,
  FaHistory,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { LuContact } from "react-icons/lu";
import {
  MdOutlineLibraryBooks,
  MdOutlineShoppingBag,
  MdReviews,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* DASHBOARD SIDE BAR */}
      <div className="w-64 min-h-screen bg-orange-300">
        <ul className="menu w-full">
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
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome></FaHome>User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/mybooking">
                  <FaBookBookmark></FaBookBookmark>My Bookings
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart> My Cart
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addreview">
                  <MdReviews></MdReviews> Add a Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymenthistory">
                  <FaHistory></FaHistory> Payment History
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
            <NavLink to="/orderfood">
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
