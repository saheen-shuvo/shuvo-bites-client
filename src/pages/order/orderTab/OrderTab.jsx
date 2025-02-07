/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import FoodCard from "../../../shared/FoodCard";

const OrderTab = ({items}) => {
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {items.map((item) => (
        <FoodCard item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
