/* eslint-disable react/no-unescaped-entities */
import featuredImg from '../../assets/home/featured.jpg'
import './featured.css'
const Featured = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 my-8 lg:my-16 featured-item text-white bg-fixed">
        <div className='pt-12'>
        <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto">
        FEATURED ITEM
      </div>
        </div>
      <div className='md:flex justify-center items-center pt-14 pb-20 lg:px-36'>
        <div className='mb-4 md:mb-0'>
            <img src={featuredImg} alt="" />
        </div>
        <div className='md:ml-10'>
            <p>24 January, 2025</p>
            <p className='uppercase my-2 font-semibold text-lg'>Where can i get some?</p>
            <p>Chicken Puchka is a flavorful delight featuring tender grilled chicken skewers marinated in aromatic spices. Juicy, smoky, and perfectly charred, it's served with fresh salad, warm pita, and a tangy dip, making it a must-try for food lovers.</p>
            <button className="btn btn-primary mt-4 border-0 border-b-4 border-blue-950">ORDER NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
