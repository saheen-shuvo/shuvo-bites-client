
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/Animation - 1742381715655.json";

const Cart = () => {
  const [cart, refetch, isLoading] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-52 border-dashed font-semibold border-gray-400 mx-auto my-8">
        MY CART
      </div>
      <div className="flex justify-around items-center">
        <h2 className="text-xl font-semibold">Items: {cart.length}</h2>
        <h2 className="text-xl font-semibold">Total Price: {totalPrice}$</h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="styled-btn">PAY NOW</button>
          </Link>
        ) : (
          <button disabled className="styled-btn opacity-40">
            PAY NOW
          </button>
        )}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-16">
          <Lottie animationData={loadingAnimation} loop={true} className="w-24 h-24" />
        </div>
      ) : cart.length ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
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
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt={item.name} />
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
      ) : (
        <div className="text-center py-10">
          <p className="text-xl font-semibold my-24">
            No items added! Wanna Add Some?
          </p>
          <button onClick={() => navigate("/orderfood")} className="styled-btn">
            ADD ITEMS
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
