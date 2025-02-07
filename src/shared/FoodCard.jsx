/* eslint-disable react/prop-types */


const FoodCard = ({item}) => {
    const {image, name, price, recipe} = item;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
      <p className="bg-slate-800 text-white font-semibold absolute right-0 mt-4 mr-4 p-1">${price}</p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
