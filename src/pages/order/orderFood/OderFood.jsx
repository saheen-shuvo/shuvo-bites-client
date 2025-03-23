/* eslint-disable react/jsx-key */
import { useState } from "react";
import orderImg from "../../../assets/home/banner.jpg";
import Cover from "../../../shared/cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../orderTab/OrderTab";

const OderFood = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [menu] = useMenu();
  const pizza = menu.filter(item => item.category === 'pizza');
  const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const drinks = menu.filter(item => item.category === 'drinks');

  return (
    <div className="pt-16">
      <Cover menuImg={orderImg} title="ORDER FOOD" description="Place an order for your favorite meal and have it delivered right to your doorstep, making dining convenient and hassle-free."></Cover>
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto mt-8">
        ORDER NOW
      </div>
      <div className="max-w-screen-xl mx-auto px-4 my-8 lg:mb-16">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          <TabPanel>
            <OrderTab items={salad}></OrderTab>
          </TabPanel>
          <TabPanel>
          <OrderTab items={pizza}></OrderTab>
          </TabPanel>
          <TabPanel>
          <OrderTab items={soup}></OrderTab>
          </TabPanel>
          <TabPanel>
          <OrderTab items={dessert}></OrderTab>
          </TabPanel>
          <TabPanel>
          <OrderTab items={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default OderFood;
