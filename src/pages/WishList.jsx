import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishListContext } from "../store/WishListContext";
import { SidebarContext } from "../store/SideBarContext";
import WishListItem from "../components/body/WishListItem";

const WishList = () => {
  const { items } = useContext(WishListContext);
  const { isOpen, handleClose } = useContext(SidebarContext);

  return (
    <div>
      {items.length > 0 ? (
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {items.map((item, index) => {
                return <WishListItem key={index} item={item} />;
              })}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col justify-center items-center py-16">
          <p className=" px-8 py-8">
            Your WishList is empty. Let's Add Some Items.
          </p>
          <button
            className=" rounded-sm bg-blue-500 text-white px-2 py-2"
            onClick={handleClose}
          >
            <Link to="/">Add Items</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default WishList;
