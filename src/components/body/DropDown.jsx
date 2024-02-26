import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

const DropDown = ({ onClose }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/auth", { replace: true });
  };
  return (
    <>
      <div id="dropdown" className="fixed my-7 bg-gray-600 rounded-lg">
        <ul
          className="text-sm text-white"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <Link
              to={"/home"}
              className="block px-4 py-2 hover:bg-gray-500 rounded-lg"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={"/auth"}
              className="block px-4 py-2 hover:bg-gray-500 rounded-lg"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropDown;
