import Category from "./Category";
import Banner from "./Banner";
import Description from "./Description";
import PopularMenu from "./PopularMenu";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Description></Description>
            <PopularMenu></PopularMenu>
        </div>
    );
};

export default Home;