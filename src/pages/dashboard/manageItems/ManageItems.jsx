/* eslint-disable react/jsx-key */
import { MdDeleteForever } from "react-icons/md";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/Animation - 1742381715655.json";

const ManageItems = () => {
  const [menu, isLoading, refetch] = useMenu();
  console.log(isLoading);
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
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
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        // console.log(res.data)
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            title: `${item.name} has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="pt-8">
        <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-72 border-dashed font-semibold border-gray-400 mx-auto">
          MANAGE ALL ITEMS
        </div>
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
          {/* TABLE */}
          <div className="overflow-x-auto pt-8">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{item.name}</td>
                    <td className="font-semibold">${item.price}</td>
                    <th>
                      <Link to={`/dashboard/updateitem/${item._id}`}>
                        <button className="text-2xl text-green-600">
                          <FaEdit />
                        </button>
                      </Link>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDeleteItem(item)}
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
        </>
      )}
    </div>
  );
};

export default ManageItems;
