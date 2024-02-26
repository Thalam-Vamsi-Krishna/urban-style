import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ProductProvider from "./store/ProductContext";
import SidebarProvider from "./store/SideBarContext";
import CartProvider from "./store/CartContext";
import WishListProvider from "./store/WishListContext";
import AuthProvider from "./store/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WishListProvider>
      <SidebarProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </SidebarProvider>
    </WishListProvider>
  </AuthProvider>
);
