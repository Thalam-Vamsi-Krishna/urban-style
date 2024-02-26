import WomanImg from "../../assets/online-fashion-shopping.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-pink-200 py-8 md:h-[540px] md:py-24">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center h-full">
        <div className="flex-shrink-0 md:w-1/2">
          <img
            src={WomanImg}
            alt="New Trend"
            className="mx-auto my-auto md:h-[400px]"
          />
        </div>
        <div className="text-left space-y-6 p-2 mb-4 md:mb-0 md:w-1/2">
          <h1 className="text-5xl font-bold text-gray-800">
            Discover the Latest Trends
          </h1>
          <p className="text-xl text-gray-700">
            Explore our new collection to find your perfect style.
          </p>
          <Link
            to="/"
            className="inline-block bg-black text-white text-lg px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
