import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    // IMG upload to imgbb and get url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          icon: "success",
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };

  return (
    <div>
      <div className="pt-12">
        <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto">
          ADD AN ITEM
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full flex flex-col mt-8">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              {...register("name")}
              required
              type="text"
              placeholder="recipe name"
              className="input input-bordered w-full "
            />
          </label>

          <div className="flex flex-col lg:flex-row lg:gap-3">
            {/* CATEGORY */}
            <label className="form-control w-full flex flex-col mt-4">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                defaultValue="default"
                {...register("category")}
                required
                className="select select-bordered w-full "
              >
                <option value="default" disabled selected>
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>
            {/* PRICE */}
            <label className="form-control w-full flex flex-col mt-4">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                {...register("price")}
                type="number"
                placeholder="price"
                required
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* RECIPE DESCRIPTION */}
          <label className="form-control flex flex-col mt-4">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
              {...register("recipe")}
              required
              className="textarea textarea-bordered h-24"
              placeholder="recipe details"
            ></textarea>
          </label>

          {/* FILE INPUT */}
          <div className="mt-4">
            <input
              {...register("image")}
              type="file"
              required
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          {/* BUTTON */}
          <div className="my-4 flex justify-center">
            <button className="btn btn-primary">
              ADD ITEM <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
