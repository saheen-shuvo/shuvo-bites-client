/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/Animation - 1742381715655.json";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosPublic = useAxiosPublic();

  // Get all bookings data from backend
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings`);
      return res.data;
    },
  });

  const handleStatus = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Booking!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.patch(`/bookings/${id}`, {
          status: "booked",
        });
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Confirmed!",
            text: "The Reservation is Confirmed as Booked!",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/bookings/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
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
        MANAGE BOOKINGS
      </div>
      {isLoading ? (
        <>
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
          {bookings.length > 0 ? (
            <div>
              {/* FOR LARGE SCREEN */}
              <div className="overflow-x-auto hidden md:block">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Booked By</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Package</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{booking.name}</td>
                        <td>{booking.email}</td>
                        <td>{booking.date}</td>
                        <td>{booking.seats}</td>
                        <td>
                          {" "}
                          <button
                            onClick={() => handleStatus(booking._id)}
                            className={`btn btn-xs text-white uppercase w-16 ${
                              booking.status === "pending"
                                ? "bg-amber-600"
                                : "bg-green-700"
                            }`}
                          >
                            {booking.status}
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="text-red-700 text-2xl"
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FOR SMALL SCREEN */}
              <div className="overflow-x-auto block md:hidden">
                {bookings.map((booking, index) => (
                  <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                    <tbody>
                      <tr>
                        <th>Serial</th>
                        <td>{index + 1}</td>
                      </tr>
                      <tr>
                        <th>Booked By</th>
                        <td>{booking.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{booking.email}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{booking.date}</td>
                      </tr>
                      <tr>
                        <th>Package</th>
                        <td>{booking.seats}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>
                          {" "}
                          <button
                            onClick={() => handleStatus(booking._id)}
                            className={`btn btn-xs text-white uppercase w-16 ${
                              booking.status === "pending"
                                ? "bg-amber-600"
                                : "bg-green-700"
                            }`}
                          >
                            {booking.status}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th>Action</th>
                        <td>
                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="text-red-700 text-2xl"
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl font-semibold my-24">
                No Booking Found! Wanna Book Now?
              </p>
              <Link to="/booknow">
                <button className="styled-btn">BOOK NOW</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageBookings;
