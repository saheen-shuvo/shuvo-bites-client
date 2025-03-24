/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookNow = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const reviewData = {
      ...data,
      details: data.details.replace(/\n/g, " ").trim(),
      name: user?.displayName || "Anonymous",
      email: user?.email,
      status: "pending"
    };
    try {
      const response = await axiosSecure.post("/bookings", reviewData);
      Swal.fire({
        position: "center",
        title: `Thanks! Booked Successfully!`,
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
      });
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        position: "center",
        title: `Failed to submit. Try again.`,
        showConfirmButton: false,
        icon: "error",
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="pt-16 md:pt-24 mx-4">
        <div
          className="text-center sm:text-xl lg:text-3xl border-y-2 w-64  border-dashed font-semibold border-gray-400 mx-auto 
      mb-8 md:mb-16 mt-8"
        >
          BOOK NOW
        </div>
        <div className="card  w-full max-w-sm shrink-0 shadow-md mx-auto mb-12">
          <div className="card-body">
            <h1 className="text-center text-base md:text-lg font-semibold my-4">
              Fill This Out to Make a Reservation!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* SELECT DATE */}
              <label className="fieldset-label">
                Reserve Your Required Seats
              </label>
              <select
                {...register("seats", {
                  required: "Please select a package",
                })}
                defaultValue=""
                className="select"
              >
                <option value="" disabled>
                  Pick a Package
                </option>
                <option value="16-seats-north">16 Seats - North End</option>
                <option value="32-seats-south">32 Seats - South End</option>
                <option value="64-seats-hall">64 Seats - Hall End</option>
              </select>

              {/* Error Message */}
              {errors.seats && (
                <p className="text-red-500 text-sm">{errors.seats.message}</p>
              )}

              {/* Select Date*/}
              <label className="fieldset-label mt-4">Select a Date</label>
              <input
                type="date"
                className="input"
                placeholder="Select Date"
                {...register("date", {
                  required: "Date is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return (
                      selectedDate > today || "Please select a future date"
                    );
                  },
                })}
              />
              {/* Date Error */}
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}

              {/* DESCRIPTION */}
              <label className="fieldset-label mt-4">
                Write what You expect from us
              </label>
              <textarea
                className="textarea h-24"
                placeholder="Description"
                {...register("details", {
                  required: "Details is required",
                  maxLength: {
                    value: 101,
                    message: "Details can not exceed 101 character.",
                  },
                })}
              ></textarea>
              {/* Review Error */}
              {errors.details && (
                <p className="text-red-500 text-sm">{errors.details.message}</p>
              )}

              <div className="flex justify-center">
                <button className="styled-btn mt-4">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
