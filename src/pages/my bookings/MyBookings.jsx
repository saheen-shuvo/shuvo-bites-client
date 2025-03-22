/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/Animation - 1742381715655.json";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings/${user.email}`);
      return res.data;
    },
  });

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
    <div>
      <div
        className="text-center sm:text-xl lg:text-3xl border-y-2 w-64  border-dashed font-semibold border-gray-400 mx-auto 
      mb-16 mt-8"
      >
        MY BOOKINGS
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
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
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
                      <td>{booking.date}</td>
                      <td>{booking.seats}</td>
                      <td>{booking.status}</td>
                      <td>
                        {" "}
                        {booking.status === "pending" ? (
                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="styled-btn"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button className="bg-[#d3858d] flex items-center gap-1 px-[11px] py-[6px] rounded-lg text-white border-b-4 border-[#001f3f] transition-all mr-1 text-[10px] md:text-[12px] font-semibold" disabled>
                            Booked
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl font-semibold my-24">
                No Booking Found! Wanna Book Now?
              </p>
              <Link to='/booknow'>
                <button className="styled-btn">BOOK NOW</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;
