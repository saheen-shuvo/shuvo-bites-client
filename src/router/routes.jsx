import {
    createBrowserRouter
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import OderFood from "../pages/order/orderFood/OderFood";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/menu',
            element: <Menu>-</Menu>
        },
        {
            path: '/orderfood',
            element: <OderFood></OderFood>
        }
      ]
    },
  ]);