import img1 from "../../assets/home/slide5.jpg";
import img2 from "../../assets/home/slide4.jpg";
import img3 from "../../assets/home/slide2.jpg";
import { motion } from "framer-motion";
const ChefRecommends = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 my-8 lg:my-16">
      <div
        className="text-center sm:text-xl lg:text-3xl border-y-2 w-64 lg:w-72 border-dashed font-semibold border-gray-400 mx-auto 
      mb-8 md:mb-12"
      >
        CHEF RECOMMENDS
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card card-compact bg-base-100 shadow-md"
        >
          <figure>
            <img className="rounded-lg mt-4" src={img1} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Onion Salads</h2>
            <p>
              Onion, lettuse, cucumber, cheesse, tomatos, and some special
              items.
            </p>
            <div className="card-actions justify-end">
              <button className="styled-btn">ADD TO CART</button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card card-compact bg-base-100 shadow-md"
        >
          <figure>
            <img className="rounded-lg mt-4" src={img2} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Deserts</h2>
            <p>
              Made with eggs, flour, chocolate powder, goat milk, cheese and
              some coffee things.
            </p>
            <div className="card-actions justify-end">
              <button className="styled-btn">ADD TO CART</button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card card-compact bg-base-100 shadow-md"
        >
          <figure>
            <img className="rounded-lg mt-4" src={img3} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Cheese Pizza</h2>
            <p>
              Made with tomatos, grapes, onion, cheese, chicken, lettuse and so
              on. grab this right now.
            </p>
            <div className="card-actions justify-end">
              <button className="styled-btn">ADD TO CART</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChefRecommends;
