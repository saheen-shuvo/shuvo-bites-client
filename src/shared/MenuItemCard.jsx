/* eslint-disable react/prop-types */

const MenuItemCard = ({ item }) => {
  const { image, name, price, recipe } = item;
  return (
    <div className="flex justify-between bg-base-100 p-4 shadow-sm rounded-xl">
      <div className="flex space-x-4">
        <img
          style={{ borderRadius: "0 200px 200px" }}
          className="w-[120px] h-[120px] aspect-square object-cover border-2 border-base-300 shadow-md"
          src={image}
          alt=""
        />

        <div>
          <h3 className="uppercase font-semibold">{name}</h3>
          <p>{recipe}</p>
        </div>
      </div>
      <p className="text-yellow-600">${price}</p>
    </div>
  );
};

export default MenuItemCard;
