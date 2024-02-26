import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
export const WishListContext = createContext({
  items: [],
  addWishItem: (item) => {},
  removeWishItem: (id) => {},
});

const WishListProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const email = authCtx.email.replace(/[^a-zA-Z0-9]/g, "");
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    fetchWishListedItems();
  }, []);
  const addItemToWishList = async (item) => {
    try {
      const existingItemIndex = wishList.findIndex(
        (wishlistItem) => wishlistItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        console.log("Item already exists in the wishlist");
        return;
      }
      const response = await fetch(
        `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/wishList${email}.json`,
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log("Failed to add the item to the wishlist");
        return;
      }
      await fetchWishListedItems();
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  const removeItemFromWishList = async (id) => {
    try {
      const updatedItems = wishList.filter((item) => item.id !== id);

      const response = await fetch(
        `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/wishList${email}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItems),
        }
      );
      if (!response.ok) {
        console.log("Failed to remove the item from the wishlist");
        return;
      }
      await fetchWishListedItems();
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const fetchWishListedItems = async () => {
    try {
      const response = await fetch(
        `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/wishList${email}.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wishList");
      }
      const data = await response.json();
      const wishListItems = data ? Object.values(data) : [];
      setWishList(wishListItems);
    } catch (error) {
      console.error(error);
    }
  };

  const wishListContext = {
    items: wishList,
    addWishItem: addItemToWishList,
    removeWishItem: removeItemFromWishList,
  };

  return (
    <WishListContext.Provider value={wishListContext}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListProvider;
