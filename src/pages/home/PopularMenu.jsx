/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import MenuItemCard from "../../shared/MenuItemCard";

const PopularMenu = () => {

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
        .then(res => res.json())
        .then(data =>{
            const popularItems = data.filter(item => item.category === 'popular');
            setMenu(popularItems)
        })
    }, [])
  return (
    <div className="max-w-screen-xl mx-auto px-4 my-8 lg:my-16">
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto mb-8">
        OUR HOT MENU
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {
            menu.map(item =><MenuItemCard item={item}></MenuItemCard>)
        }
      </div>
    </div>
  );
};

export default PopularMenu;
