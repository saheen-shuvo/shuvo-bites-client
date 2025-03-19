import { useForm } from "react-hook-form";

const AddReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className=" ">
      <div
        className="text-center sm:text-xl lg:text-3xl border-y-2 w-64  border-dashed font-semibold border-gray-400 mx-auto 
      mb-8 mt-8"
      >
        ADD A REVIEW
      </div>
      <div className="card  w-full max-w-sm shrink-0 shadow-md mx-auto">
        <div className="card-body">
          <h1 className="text-center text-lg font-semibold my-4">
            What's your thought about us?
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* RATE OUT OF 5 */}
            <label className="fieldset-label">Rate out 5</label>
            <input
              type="number"
              className="input"
              placeholder="Rate Us"
              {...register("rate", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating cannot exceed 5" },
              })}
            />
            {/* Rating Error */}
            {errors.rate && (
              <p className="text-red-500 text-sm">{errors.rate.message}</p>
            )}

            {/* REVIEW DESCRIPTION */}
            <label className="fieldset-label mt-4">Write your review</label>
            <textarea
              className="textarea h-24"
              placeholder="Review"
              {...register("review", {
                required: "Review is required",
                maxLength: {
                  value: 101,
                  message: "Review can not exceed 101 character.",
                },
              })}
            ></textarea>
            {/* Review Error */}
            {errors.review && (
              <p className="text-red-500 text-sm">{errors.review.message}</p>
            )}

            <div className="flex justify-center">
              <button className="styled-btn mt-4">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
