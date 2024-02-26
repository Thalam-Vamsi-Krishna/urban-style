import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import WishList from "./pages/WishList";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SideBar from "./components/body/SideBar";
import AuthForm from "./components/auth/AuthForm";
import { AuthContext } from "./store/AuthContext";
import DropDown from "./components/body/DropDown";
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          {!authCtx.isLoggedIn && (
            <>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <AuthForm />
                  </>
                }
              />
              <Route
                path="/auth"
                element={
                  <>
                    <Header />
                    <AuthForm />
                  </>
                }
              />
            </>
          )}
          {authCtx.isLoggedIn && (
            <>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <>
                    <Header />
                    <WishList />
                  </>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <>
                    <Header />
                    <ProductDetails />
                    <Footer />
                  </>
                }
              />
            </>
          )}
        </Routes>
        <SideBar />
      </Router>
    </div>
  );
};

export default App;
