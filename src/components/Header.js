import { useContext, useEffect, useState } from "react";
import logo from "../assets/img/FoodVilla.png";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";

import useOnline from "../utils/useOnline";
import "../input.css";
import { useSelector } from "react-redux";
import Store from "../utils/Store";

const loggedInUser = () => {
  //API Call to Check the Authentication
  return true;
};

export const Title = () => (
  <a href="/">
    <img src={logo} alt="logo" className="w-24 p-2" />
  </a>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isOnline = useOnline();

  const { user } = useContext(UserContext);

  const cartItems = useSelector((Store) => Store.cart.items);
  return (
    <>
      <div className="flex justify-between bg-pink-50 shadow-md">
        <Title />
        <div className="nav-items">
          <ul className="list-none flex flex-row justify-center items-center h-20 ">
            <li className="px-3">
              <Link to="/">Home</Link>
            </li>
            <li className="px-3">
              <Link to="/about">About</Link>
            </li>
            <Link to="/contact">Contact</Link>
            <li className="px-3">
              <Link to="/about/profile">Profile</Link>
            </li>
            <li className="px-3">
              <Link to="/profileClass">ProfileClass</Link>
            </li>
            <li className="px-3">
              <Link to="/Instamart">Instamart</Link>
            </li>
            <li className="px-3">
              <Link to="/cart">Cart - {cartItems.length} 🛒</Link>
            </li>
          </ul>
          {console.log(cartItems)}
        </div>
        <div className="flex justify-center items-center h-20">
          <h2 className="text-2xl"> {isOnline ? "✅" : "🔴"} </h2>
          <h6 className="text-sm">{user.name}</h6>
        </div>
        {isLoggedIn ? (
          <Link to={"/login"}>
            <button
              className="rounded-md border-4 border-solid border-blue-400 p-4 mr-3"
              onClick={() => {
                setIsLoggedIn(false);
              }}
            >
              Login
            </button>
          </Link>
        ) : (
          <button
            className="rounded-md border-4 border-solid border-blue-400 p-3 mr-3"
            onClick={() => {
              setIsLoggedIn(true);
            }}
          >
            LogOut
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
