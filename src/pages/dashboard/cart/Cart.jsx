/* eslint-disable react/jsx-key */
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          refetch();
          if (res.data.deleteCount > 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 lg:w-80 border-dashed font-semibold border-gray-400 mx-auto my-8">
        WANNA ADD MORE?
      </div>
      <div className="flex justify-around items-center">
        <h2 className="text-2xl font-semibold">Items: {cart.length}</h2>
        <h2 className="text-2xl font-semibold">Total Price: {totalPrice}$</h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">PAY NOW</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            PAY NOW
          </button>
        )}
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
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
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg text-red-600"
                  >
                    <MdDeleteForever />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
