/* eslint-disable react/jsx-key */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ImQuotesLeft } from "react-icons/im";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto mt-0 my-12 lg:my-24 px-4">
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 border-dashed font-semibold border-gray-400 mx-auto lg:mb-0">
        TESTIMONIALS
      </div>
      <div className="bg-base-100 shadow-sm rounded-2xl p-4 mt-8 md:mt-16">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide>
              <div className="mx-12 lg:mx-24 lg:my-16 flex flex-col items-center">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <div className="text-8xl lg:my-8">
                  <ImQuotesLeft />
                </div>
                <p className="lg:py-6 text-center">{review.details}</p>
                <h3 className="text-2xl text-orange-600">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
