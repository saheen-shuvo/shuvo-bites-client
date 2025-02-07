/* eslint-disable react/jsx-key */
import MenuItemCard from "../../shared/MenuItemCard";
import useMenu from "../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

  return (
    <div className="max-w-screen-xl mx-auto px-4 my-8 lg:my-16">
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto mb-8">
        OUR HOT MENU
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {
            popular.map(item =><MenuItemCard item={item}></MenuItemCard>)
        }
      </div>
    </div>
  );
};

export default PopularMenu;
