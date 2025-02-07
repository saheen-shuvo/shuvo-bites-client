import Category from "./Category";
import Banner from "./Banner";
import Description from "./Description";
import PopularMenu from "./PopularMenu";
import ChefRecommends from "./ChefRecommends";
import Featured from "./Featured";
import Testimonials from "./Testimonials";
import Callus from "./Callus";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Description></Description>
            <PopularMenu></PopularMenu>
            <ChefRecommends></ChefRecommends>
            <Callus></Callus>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;