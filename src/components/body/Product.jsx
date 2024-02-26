import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsHeart, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../../store/CartContext";
import { WishListContext } from "../../store/WishListContext";
const Product = ({ product }) => {
  const { id, image, title, price } = product;
  const cartCtx = useContext(CartContext);
  const wishListCtx = useContext(WishListContext);
  const addToCartHandler = (item) => {
    cartCtx.addItem({
      id: item.id,
      image: item.image,
      title: item.title,
      price: item.price,
      amount: 1,
    });
  };
  const addToWishListHandler = (item) => {
    wishListCtx.addWishItem({
      id: item.id,
      image: item.image,
      title: item.title,
      price: item.price,
    });
  };
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/*image*/}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt=""
            />
          </div>
        </div>
        {/*buttons*/}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCartHandler(product)}>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-blue-500 hover:bg-blue-400 drop-shadow-xl">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <button onClick={() => addToWishListHandler(product)}>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-red-500 hover:bg-red-400 drop-shadow-xl">
              <BsHeart className="text-3xl" />
            </div>
          </button>
        </div>
        <div className="absolute bottom-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/product/${id}`}
            className=" bg-yellow-400 hover:bg-yellow-500 flex justify-center items-center w-10 h-10 text-white drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
        <h2>$ {price}</h2>
      </div>
    </div>
  );
};

export default Product;
