import menuImg from "../../assets/menu/pizza-bg.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import drinksImg from "../../assets/menu/order.jpg";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "./MenuCategory";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div className="mb-12">
      {/* PIZZA */}
      <div className="">
        <MenuCategory
          items={pizza}
          img={menuImg}
          title="PIZZA"
          description={
            "Pizza is a delicious, cheesy dish with a crispy crust, topped with savory sauce, meats, vegetables, and herbs, baked to perfection."
          }
        ></MenuCategory>
      </div>
      <div className="flex justify-center mb-6">
        <Link to="/orderfood">
          <button className="styled-btn">ORDER NOW</button>
        </Link>
      </div>
      {/* DESSERT */}
      <div className="mt-8 md:mt-16">
        <MenuCategory
          items={dessert}
          title="DESSERTS"
          description={
            "Desserts are sweet treats enjoyed after meals, including cakes, pastries, puddings, and chocolates, offering rich flavors and delightful textures."
          }
          img={dessertImg}
        ></MenuCategory>
      </div>
      <div className="flex justify-center mb-4">
        <Link to="/orderfood">
          <button className="styled-btn">ORDER NOW</button>
        </Link>
      </div>
      {/* SALAD */}
      <div className="mt-8 md:mt-16">
        <MenuCategory
          items={salad}
          title="SALADS"
          description={
            "Salads are fresh, healthy dishes made with vegetables, fruits, proteins, and dressings, offering a delicious mix of flavors and textures."
          }
          img={saladImg}
        ></MenuCategory>
      </div>
      <div className="flex justify-center mb-4">
        <Link to="/orderfood">
          <button className="styled-btn">ORDER NOW</button>
        </Link>
      </div>
      {/* SOUP */}
      <div className="mt-8 md:mt-16">
        <MenuCategory items={soup} title="SOUPS" img={soupImg} description={"Soups are warm, comforting dishes made with broth, vegetables, meats, or beans, offering rich flavors and hearty nourishment."}></MenuCategory>
      </div>
      <div className="flex justify-center mb-4">
        <Link to="/orderfood">
          <button className="styled-btn">ORDER NOW</button>
        </Link>
      </div>
      {/* DRINKS */}
      <div className="mt-8 md:mt-16">
        <MenuCategory
          items={drinks}
          title="DRINKS"
          img={drinksImg}
          description={"Drinks are refreshing beverages, including juices, smoothies, teas, and sodas, offering hydration, flavor, and enjoyment in every sip. "}
        ></MenuCategory>
      </div>
      <div className="flex justify-center mb-4">
        <Link to="/orderfood">
          <button className="styled-btn">ORDER NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
