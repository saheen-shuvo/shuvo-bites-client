/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddReview = () => {
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
      rating: parseFloat(data.rating),
      details: data.details.replace(/\n/g, " ").trim(),
      name: user?.displayName || "Anonymous",
      email: user?.email,
      image: user?.photoURL,
    };
    try {
      const response = await axiosSecure.post("/reviews", reviewData);
      Swal.fire({
        position: "center",
        title: `Review Submitted Successfully!`,
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
      });
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        position: "center",
        title: `Failed to Submit. Try Again!`,
        showConfirmButton: false,
        icon: "error",
        timer: 1500,
      });
    }
  };

  return (
    <div className=" ">
      <div
        className="text-center sm:text-xl lg:text-3xl border-y-2 w-64  border-dashed font-semibold border-gray-400 mx-auto 
      mb-16 mt-8"
      >
        ADD A REVIEW
      </div>
      <div className="card  w-full max-w-sm shrink-0 shadow-md mx-auto">
        <div className="card-body">
          <h1 className="text-center text-lg font-semibold my-4">
            What's your thought about us?
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Rating OUT OF 5 */}
            <label className="fieldset-label">Rate out 5</label>
            <input
              type="number"
              className="input"
              placeholder="Rate Us"
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating cannot exceed 5" },
              })}
            />
            {/* Rating Error */}
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}

            {/* REVIEW DESCRIPTION */}
            <label className="fieldset-label mt-4">Write your review</label>
            <textarea
              className="textarea h-24"
              placeholder="Review"
              {...register("details", {
                required: "Review is required",
                maxLength: {
                  value: 101,
                  message: "Review can not exceed 101 character.",
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
  );
};

export default AddReview;
