import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/BannerImg/Banner1.jpg";
import img2 from "../../assets/BannerImg/Banner2.jpg";
import img3 from "../../assets/BannerImg/Banner3.jpg";
import img4 from "../../assets/BannerImg/Banner4.jpg";
import img5 from "../../assets/BannerImg/Banner5.jpg";

const Banner = () => {
  return (
    <div className="pt-16">
      <Carousel className="">
        <div className="">
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
        <div>
          <img src={img4} />
        </div>
        <div>
          <img src={img5} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
