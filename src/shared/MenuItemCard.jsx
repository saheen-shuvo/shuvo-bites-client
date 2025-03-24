/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
const MenuItemCard = ({ item }) => {
  const { image, name, price, recipe } = item;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between bg-base-100 p-4 shadow-sm rounded-xl"
    >
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
    </motion.div>
  );
};

export default MenuItemCard;
