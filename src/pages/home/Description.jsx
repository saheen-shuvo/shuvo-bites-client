import chefservice from '../../assets/home/chef-service.jpg';

const Description = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 my-8 lg:my-16 relative">
            <img src={chefservice} alt="Chef Service" className="w-full h-auto" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                             px-3 sm:px-6 py-2 sm:py-4 shadow-md 
                            w-[85%] bg-base-200 text-center">
                
                <h2 className="text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-bold">SHUVO BITES</h2>
                
                <p className="text-[6px] xs:text-sm sm:text-[4px] md:text-lg lg:text-lg 
                           mt-1 sm:mt-2 md:mt-3 leading-tight sm:leading-relaxed">
                    Shuvo Bites is a cozy and vibrant restaurant that brings a fusion of flavors to your plate. 
                    From sizzling appetizers to mouthwatering main courses, every dish is crafted with the finest ingredients. 
                    Whether for a family dinner, friendly gathering, or solo indulgence, experience great taste, 
                    quality, and hospitality at Shuvo Bites!
                </p>
            </div>
        </div>
    );
};

export default Description;