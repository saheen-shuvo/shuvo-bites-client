/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";


const FoodCard = ({item}) => {
    const {_id, image, name, price, recipe} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
      if(user && user.email){
        const cartItem = {
          menuId: _id,
          email: user.email,
          name,
          image,
          price
        }
        axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${name} added to your cart!`,
              showConfirmButton: false,
              timer: 1500
            });
            // Refetch to update the cart count
            refetch();
          }
        })
      }
      else{
        Swal.fire({
          title: "You are not Logged in.",
          text: "Please log in to add to cart.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Log in!"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/signin', {state: {from: location}})
          }
        });
      }
    }

  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <img className="w-full h-[250px] object-cover"
          src={image}
        />
      </figure>
      <p className="bg-slate-800 text-white font-semibold absolute right-0 mt-4 mr-4 p-1">${price}</p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
        <button onClick={handleAddToCart} className="styled-btn mt-4">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
