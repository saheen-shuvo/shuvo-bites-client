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
      // ADMIN ROUTES
      {
        path: 'additems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'manageitems',
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: 'updateitem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: 'allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }
    ],
  },
]);
