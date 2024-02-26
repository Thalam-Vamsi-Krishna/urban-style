import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { CartContext } from "../../store/CartContext";
import { IoMdClose } from "react-icons/io";
import { WishListContext } from "../../store/WishListContext";
const WishListItem = ({ item }) => {
  const { id, image, title, price } = item;
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
    wishListCtx.removeWishItem(id);
  };

  const removeHandler = (id) => {
    wishListCtx.removeWishItem(id);
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
          <button onClick={() => addToCartHandler(item)}>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-green-500 drop-shadow-xl">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <button onClick={() => removeHandler(id)}>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-red-500 drop-shadow-xl">
              <IoMdClose className="text-3xl" />
            </div>
          </button>
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

export default WishListItem;
