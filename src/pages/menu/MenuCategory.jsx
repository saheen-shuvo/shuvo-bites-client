/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import Cover from "../../shared/cover/Cover";
import MenuItemCard from "../../shared/MenuItemCard";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div>
    {title && <Cover menuImg={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-8 my-8 max-w-screen-xl mx-auto px-4 lg:my-16">
        {items.map((item) => (
          <MenuItemCard item={item}></MenuItemCard>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
