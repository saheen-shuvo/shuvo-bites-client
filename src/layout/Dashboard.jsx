import { FaCalendar, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { LuContact } from "react-icons/lu";
import { MdOutlineLibraryBooks, MdOutlineShoppingBag, MdReviews } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {

  const [cart] = useCart();

  return (
    <div className="flex">
      {/* DASHBOARD SIDE BAR */}
      <div className="w-64 min-h-screen bg-orange-300">
        <ul className="menu w-full">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome>User Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/reservation">
              <FaCalendar></FaCalendar> Reservation
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart></FaShoppingCart>My Cart ({cart.length})
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/addReview">
              <MdReviews />
              Add Review
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myBookings">
              <FaBookBookmark />
              My Bookings
            </NavLink>
          </li>

          <div className="divider"></div>

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
