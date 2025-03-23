/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/Animation - 1742381715655.json";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const handleDeleteOrder = (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/payments/${order._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            title: `The Order has been Deleted.`,
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
          });
        }
      }
    });
  };

  const handleViewOrder = async (order) => {
    setSelectedOrder(order);
    setMenuItems([]);
    if (order.menuItemIds.length > 0) {
      const res = await axiosSecure.get("/menu");
      const matchedMenuItems = res.data.filter((menu) =>
        order.menuItemIds.includes(menu._id)
      );
      setMenuItems(matchedMenuItems);
    }
    document.getElementById("my_modal_3").showModal();
  };

  const handleStatus = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Mark as Delivered!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/payments/${id}`, {
          status: "delivered",
        });
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Confirmed!",
            text: "The Order is Marked as Booked!",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="pt-4 md:pt-8">
      <div className="mb-8 text-center sm:text-xl lg:text-3xl border-y-2 w-72 border-dashed font-semibold border-gray-400 mx-auto">
        MANAGE ORDERS
      </div>
      {isLoading ? (
        <>
          {" "}
          <div className="flex justify-center items-center my-16">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              className="w-24 h-24"
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          {/* TABLE FOR LARGE SCREEN */}
          <div className="overflow-x-auto hidden md:block">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>View Order</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{order.email}</td>
                    <td>
                      {" "}
                      {new Date(order.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="styled-btn"
                      >
                        VIEW
                      </button>
                    </td>
                    <th>
                      {" "}
                      <button
                        onClick={() => handleStatus(order._id)}
                        className={`btn btn-xs text-white uppercase w-16 ${
                          order.status === "pending"
                            ? "bg-amber-600"
                            : "bg-green-700"
                        }`}
                      >
                        {order.status}
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDeleteOrder(order)}
                        className="text-2xl text-red-600"
                      >
                        <MdDeleteForever />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* TABLE FOR SMALL SCREEN */}
          <div className="overflow-x-auto block md:hidden">
            {orders.map((order, index) => (
              <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                <tbody>
                  <tr>
                    <th>Serial</th>
                    <td>{index + 1}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{order.email}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>
                      {" "}
                      {new Date(order.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>View Order</th>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="styled-btn"
                      >
                        VIEW
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleStatus(order._id)}
                        className={`btn btn-xs text-white uppercase w-16 ${
                          order.status === "pending"
                            ? "bg-amber-600"
                            : "bg-green-700"
                        }`}
                      >
                        {order.status}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Delete</th>
                    <td>
                      <button
                        onClick={() => handleDeleteOrder(order)}
                        className="text-2xl text-red-600"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </>
      )}

      {/* MODAL DIALOG */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {selectedOrder ? (
            <>
              <h3 className="font-bold text-lg">Order Details</h3>
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.email}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.date).toLocaleString()}
              </p>
              <p>
                <strong>Price:</strong> ${selectedOrder.price}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>

              {/* Display Menu Items */}
              <p className="font-bold mt-4">Ordered Items:</p>
              <ul className="list-disc pl-5">
                {menuItems.length > 0 ? (
                  menuItems.map((item) => <li key={item._id}>{item.name}</li>)
                ) : (
                  <p className="text-gray-500">Loading menu items...</p>
                )}
              </ul>
            </>
          ) : (
            <p className="py-4">No order selected</p>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageOrders;
