import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import OderFood from "../pages/order/orderFood/OderFood";
import Register from "../pages/register/Register";
import SignIn from "../pages/signin/SignIn";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/dashboard/cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/dashboard/allUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/dashboard/addItems/AddItems";
import ManageItems from "../pages/dashboard/manageItems/ManageItems";
import UpdateItem from "../pages/dashboard/updateItem/UpdateItem";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentHistory from "../pages/dashboard/payment/PaymentHistory";
import AdminHome from "../pages/dashboard/adminHome/AdminHome";
import MyProfile from "../shared/MyProfile";
import AddReview from "../pages/add review/AddReview";
import BookNow from "../pages/book now/BookNow";
import MyBookings from "../pages/my bookings/MyBookings";
import ManageBookings from "../pages/manage bookings/ManageBookings";
import ManageOrders from "../pages/manage orders/ManageOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu>-</Menu>,
      },
      {
        path: "/orderfood",
        element: <OderFood></OderFood>,
      },
      {
        path: "/booknow",
        element: <BookNow></BookNow>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // NORMAL USER ROUTES
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "addreview",
        element: <AddReview></AddReview>,
      },
      {
        path: "mybookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "myprofile",
        element: <MyProfile></MyProfile>,
      },
      // ADMIN ROUTES
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "additems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "manageitems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "manageorders",
        element: (
          <AdminRoute>
            <ManageOrders></ManageOrders>
          </AdminRoute>
        ),
      },
      {
        path: "managebookings",
        element: (
          <AdminRoute>
            <ManageBookings></ManageBookings>
          </AdminRoute>
        ),
      },
      {
        path: "updateitem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://shuvo-bites-server.vercel.app/menu/${params.id}`),
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
    ],
  },
]);
