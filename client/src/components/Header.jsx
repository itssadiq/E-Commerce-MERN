import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation, useProfileInfoQuery } from "../services/auth";
import { removeCredentials, setCredentials } from "../features/authSlice";

const Header = () => {
  const user = useProfileInfoQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  // const {data: user}

  // TODO: Retrieve these from your Redux Store
  // const { cartItems } = useSelector((state) => state.cart);

  // dispatch(setCredentials(user.data));

  // const { data } = useSelector((state) => state.Auth);
  // console.log(data);

  // Dummy data for visualization
  const cartItems = [];
  const userInfo = user.data;
  // const userInfo = null;

  const toggleMenu = () => setIsOpen(!isOpen);

  const logoutHandler = () => {
    dispatch(removeCredentials());
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="shrink-0 flex items-center gap-2">
              <span className="font-bold text-2xl text-indigo-600 tracking-tighter">
                MERN<span className="text-gray-900">Shop</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-medium text-sm transition-colors"
                  : "text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-medium text-sm transition-colors"
                  : "text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors"
              }
            >
              Shop
            </NavLink>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Icon (Decorative for now) */}
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Search size={20} />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="group -m-2 p-2 flex items-center relative"
            >
              <ShoppingCart
                size={22}
                className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"
              />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            {/* User Dropdown / Auth Links */}
            <div className="relative ml-3">
              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                  >
                    <User size={20} />
                    <span>{userInfo.name}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Cart ({cartItems.length})
            </Link>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 px-4">
            {userInfo ? (
              <div className="space-y-2">
                <div className="flex items-center px-3">
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-800">
                      {userInfo.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-500">
                      {userInfo.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
