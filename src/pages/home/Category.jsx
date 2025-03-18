import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slider1 from "../../assets/home/slide1.jpg";
import slider2 from "../../assets/home/slide2.jpg";
import slider3 from "../../assets/home/slide3.jpg";
import slider4 from "../../assets/home/slide4.jpg";
import slider5 from "../../assets/home/slide5.jpg";
import { Link } from "react-router-dom";

const slides = [
  { img: slider1, title: "Salads" },
  { img: slider2, title: "Pizza" },
  { img: slider3, title: "Soups" },
  { img: slider4, title: "Desserts" },
  { img: slider5, title: "Salads" },
];

const Category = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-0 lg:my-8 px-4">
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto mb-8 md:mb-12">
        TRENDING ITEMS
      </div>
      <Swiper
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          320: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {slides.concat(slides).map((slide, index) => (
          <SwiperSlide key={index} className="relative text-center">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="text-base lg:text-2xl uppercase text-center -mt-8 lg:-mt-12 bg-black bg-opacity-50 text-white py-1">
              {slide.title}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center my-4">
        <Link to="/orderfood">
          <button className="styled-btn md:mt-6">
            ORDER NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
