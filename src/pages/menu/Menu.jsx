import Cover from "../../shared/cover/Cover";
import menuImg from "../../assets/menu/pizza-bg.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "./MenuCategory";
import { Link } from "react-router-dom";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    // const offered = menu.filter(item => item.category === 'offered');
    const pizza = menu.filter(item => item.category === 'pizza');
  return (
    <div className="">
      <Cover menuImg={menuImg} title="PIZZA"></Cover>
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 lg:w-72 border-dashed font-semibold border-gray-400 mx-auto my-8">
        TODAYS OFFER
      </div>
      <div className="max-w-screen-xl mx-auto px-4 my-8 lg:my-16 ">
      <MenuCategory items={pizza}></MenuCategory>
      </div>
      <div className="flex justify-center my-4">
        <Link to='/orderfood'>
        <button className="btn btn-primary mt-4 border-0 border-b-4 border-blue-950">ORDER NOW</button>
        </Link>
      </div>
      {/* DESSERT */}
      <div className="">
        <MenuCategory items={dessert} title="DESSERTS" img={dessertImg}>
        </MenuCategory>
      </div>
      <div className="flex justify-center my-4">
        <Link to='/orderfood'>
        <button className="btn btn-primary mt-4 border-0 border-b-4 border-blue-950">ORDER NOW</button>
        </Link>
      </div>
      {/* SALAD */}
      <div className="">
        <MenuCategory items={salad} title="SALADS" img={saladImg}>
        </MenuCategory>
      </div>
      <div className="flex justify-center my-4">
        <Link to='/orderfood'>
        <button className="btn btn-primary mt-4 border-0 border-b-4 border-blue-950">ORDER NOW</button>
        </Link>
      </div>
      {/* SOUP */}
      <div className="">
        <MenuCategory items={soup} title="SOUPS" img={soupImg}>
        </MenuCategory>
      </div>
      <div className="flex justify-center my-4">
        <Link to='/orderfood'>
        <button className="btn btn-primary mt-4 border-0 border-b-4 border-blue-950">ORDER NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
