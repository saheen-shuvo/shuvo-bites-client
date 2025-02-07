import img1 from '../../assets/home/slide5.jpg'
import img2 from '../../assets/home/slide4.jpg'
import img3 from '../../assets/home/slide2.jpg'
const ChefRecommends = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 my-8 lg:my-16">
      <div className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 lg:w-72 border-dashed font-semibold border-gray-400 mx-auto mb-8">
        CHEF RECOMMENDS
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img className='rounded-lg mt-4'
              src={img1}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Onion Salads</h2>
            <p>Onion, lettuse, cucumber, cheesse, tomatos, and some special items.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">ADD TO CART</button>
              
            </div>
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img className='rounded-lg mt-4'
              src={img2}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Deserts</h2>
            <p>Made with eggs, flour, chocolate powder, goat milk, cheese and some coffee things.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">ADD TO CART</button>
            </div>
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img className='rounded-lg mt-4'
              src={img3}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Cheese Pizza</h2>
            <p>Made with tomatos, grapes, onion, cheese, chicken, lettuse and so on. grab this right now.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefRecommends;
