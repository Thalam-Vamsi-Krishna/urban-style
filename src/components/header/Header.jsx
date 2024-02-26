import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../store/SideBarContext";
import { BsPersonCircle, BsHeart, BsBag } from "react-icons/bs";
import { CartContext } from "../../store/CartContext";
import { AuthContext } from "../../store/AuthContext";
import Logo from "../../assets/logo.svg";
import DropDown from "../body/DropDown";
const Header = () => {
  const { isOpen, SetIsOpen } = useContext(SidebarContext);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  let quantity = 0;
  if (authCtx.isLoggedIn) {
    const calculateTotalQuantity = cartCtx.items.reduce(
      (total, item) => total + item.amount,
      0
    );
    quantity = calculateTotalQuantity;
  }
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? "bg-white" : "bg-pink-200"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto py-4 flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="flex items-center">
            <img className="w-[40px] px-2" src={Logo} alt="logo" />
            <header className="hidden md:inline-block font-semibold">
              Urban Style
            </header>
          </div>
        </Link>
        {authCtx.isLoggedIn && (
          <div className="flex items-center">
            <div
              className="cursor-pointer flex relative w-[50px]"
              onClick={toggleDropdown}
            >
              <BsPersonCircle
                className="text-2xl"
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
              />
              {isDropdownOpen && <DropDown onClose={closeDropdown} />}
            </div>
            <div className="cursor-pointer flex relative w-[50px]">
              <Link to={"/wishlist"}>
                <BsHeart className="text-2xl" />
              </Link>
            </div>
            <div
              onClick={() => SetIsOpen(!isOpen)}
              className="cursor-pointer flex relative"
            >
              <BsBag className="text-2xl" />
              <div className="bg-red-500 absolute -right-2 bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {quantity}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
