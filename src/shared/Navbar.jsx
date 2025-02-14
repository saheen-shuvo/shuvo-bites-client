import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import AuthContext from "../context/AuthContext/AuthContext";
import { RiShoppingCart2Fill } from "react-icons/ri";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.log("Signout error", error);
      });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const links = user ? (
    <>
      <li className="font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="/orderfood">Order Food</NavLink>
      </li>
      {
        user && isAdmin && <li><Link to='/dashboard/adminhome'>Dashboard</Link></li>
      }
      {
        user && !isAdmin && <li><Link to='/dashboard/userhome'>Dashboard</Link></li>
      }
      <li className="font-semibold">
        <NavLink to="/dashboard/cart">
          <button className="flex justify-center items-center gap-1">
            <RiShoppingCart2Fill />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li className="font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink to="/orderfood">Order Food</NavLink>
      </li>
    </>
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="navbar fixed z-10 bg-opacity-30  bg-amber-700/50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-xl font-bold text-green-800"></p>
          <p className="text-sm md:text-xl font-bold inline text-red-600">
            Shuvo<span className="text-yellow-400">Bites</span>
          </p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="relative flex items-center gap-2 md:gap-6">
              <div className="relative group">
                <img
                  className={
                    user.photoURL
                      ? "w-10 h-10 object-cover rounded-full"
                      : "hidden"
                  }
                  src={user?.photoURL}
                  alt=""
                />
                <div className="absolute bottom-[-35px] left-1/2 transform -translate-x-1/2 hidden p-2 group-hover:block text-black text-[9px] rounded-md">
                  {user?.displayName || "Unknown User"}
                </div>
              </div>
              <button onClick={handleSignOut} className="btn btn-primary">
                <MdLogout />
                <p>Log out</p>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="btn btn-ghost">
              <NavLink to="/register">Register</NavLink>
            </p>
            <p className="btn btn-ghost">
              <NavLink to="/signin">Sign in</NavLink>
            </p>
          </>
        )}
      </div>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={theme === "light" ? false : true}
        />
        <svg
          className="swap-on h-5 md:h-7 w-5 md:w-7 fill-current m-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <svg
          className="swap-off h-5 md:h-7 w-5 md:w-7 fill-current m-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
