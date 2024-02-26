import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { BsBagX } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import { SidebarContext } from "../../store/SideBarContext";
import { CartContext } from "../../store/CartContext";
import { AuthContext } from "../../store/AuthContext";

const SideBar = () => {
  const cartCtx = useContext(CartContext);
  const { isOpen, handleClose } = useContext(SidebarContext);
  const authCtx = useContext(AuthContext);

  let totalAmount = 0;
  if (cartCtx.items.length > 0) {
    totalAmount = cartCtx.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px] flex flex-col`}
    >
      <div className="flex items-center justify-between py-4 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag</div>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={handleClose}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto overflow-x-hidden border-b">
        {cartCtx.items && cartCtx.items.length > 0 ? (
          cartCtx.items.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <div className="flex h-[450px] items-center justify-center ">
            <div className="flex flex-col items-center justify-center">
              <BsBagX className="text-5xl mb-2" />
              <p className="mb-2">Cart is empty. Let's Add Some Items.</p>
              <button
                className="rounded-sm bg-blue-500 text-white px-3 py-2"
                onClick={handleClose}
              >
                <Link to="/">Add Items</Link>
              </button>
            </div>
          </div>
        )}
      </div>
      {cartCtx.items && cartCtx.items.length > 0 && (
        <div className="mt-4 mb-4">
          <div className="flex w-full justify-between items-center">
            <div className="uppercase font-semibold text-md">
              Total Amount : $ {totalAmount.toFixed(2)}
            </div>
            <div
              className="cursor-pointer bg-red-500 text-white w-10 h-10 flex justify-center items-center text-xl"
              onClick={() => cartCtx.removeItems()}
            >
              <FiTrash2 />
            </div>
          </div>
          <div className="flex">
            <Link
              to="/"
              className="bg-gray-200 flex p-2 mr-2 mt-2 justify-center items-center text-primary w-full font-medium"
            >
              View Cart
            </Link>
            <Link
              to="/"
              className="bg-primary flex p-2 ml-2 mt-2 justify-center items-center text-white w-full font-medium"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
