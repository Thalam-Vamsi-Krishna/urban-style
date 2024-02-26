import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
export const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  updateItem: (id, quantity) => {},
  removeItems: () => {},
});

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const CartProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const email = authCtx.email.replace(/[^a-zA-Z0-9]/g, "");
  const [cart, setCart] = useState(defaultCart);
  const addItemToCart = async (item) => {
    try {
      const existingCartItemIndex = cart.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingCartItemIndex !== -1) {
        const existingCartItem = cart.items[existingCartItemIndex];
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
          amount: existingCartItem.amount + item.amount,
        };
        const updatedItems = [...cart.items];
        updatedItems[existingCartItemIndex] = updatedItem;

        const updatedTotalAmount = cart.totalAmount + item.amount;
        setCart({
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });
        const response = await fetch(
          `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/cart${email}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: updatedItems,
              totalAmount: updatedTotalAmount,
            }),
          }
        );
        if (!response.ok) {
          console.log(
            "Something went wrong while updating the item in the database"
          );
        } else {
          console.log("Successfully updated item in the database");
        }
      } else {
        const newItem = {
          ...item,
          quantity: 1,
        };
        const updatedItems = [...cart.items, newItem];
        const updatedTotalAmount = cart.totalAmount + item.amount;
        setCart({
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });
        const response = await fetch(
          `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/cart${email}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: updatedItems,
              totalAmount: updatedTotalAmount,
            }),
          }
        );
        if (!response.ok) {
          console.log(
            "Something went wrong while adding the item to the database"
          );
        } else {
          console.log("Successfully added item to the database");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeItemFromCart = async (id) => {
    const existingCartItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.id === id
    );
    const existingItem = cart.items[existingCartItemIndex];
    const updatedTotalAmount = cart.totalAmount - existingItem.amount;
    const updatedItems = cart.items.filter((item) => item.id !== id);
    setCart({
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    });
    try {
      const response = await fetch(
        `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/cart${email}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          }),
        }
      );
      if (!response.ok) {
        console.log(
          "Something went wrong while deleting the item from database"
        );
      } else {
        console.log("Successfully deleted the item from database");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateQuantity = async (id, quantity) => {
    const existingCartItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.id === id
    );
    const existingItem = cart.items[existingCartItemIndex];
    if (quantity <= 0) {
      removeItemFromCart(id);
      return;
    }
    const updatedItem = {
      ...existingItem,
      quantity: quantity,
      amount: (existingItem.amount / existingItem.quantity) * quantity,
    };
    const updatedItems = [...cart.items];
    updatedItems[existingCartItemIndex] = updatedItem;
    const updatedTotalAmount = cart.items.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    setCart({
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    });
    try {
      const response = await fetch(
        `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/cart${email}.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          }),
        }
      );
      if (!response.ok) {
        console.log("Something went wrong while updating the item in database");
      } else {
        console.log("Successfully updated the item in database");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeItemsFromCart = async () => {
    try {
      const response = await fetch(
        `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/cart${email}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(defaultCart),
        }
      );
      setCart(defaultCart);
      if (!response.ok) {
        console.log(
          "Something went wrong while removing items from the database"
        );
      } else {
        console.log("Successfully removed items from the database");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `https://urban-style-in-default-rtdb.asia-southeast1.firebasedatabase.app/cart${email}.json`
      );
      if (!response.ok) {
        console.log(
          "Something went wrong while fetching Items from the database"
        );
      } else {
        console.log("Successfully fetched items from the database");
      }
      const data = await response.json();
      const fetchedItems = data.items || [];
      const fetchedTotalAmount = data.totalAmount || 0;
      setCart({
        items: fetchedItems,
        totalAmount: fetchedTotalAmount,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [email]);

  const cartContext = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    updateItem: updateQuantity,
    removeItems: removeItemsFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
