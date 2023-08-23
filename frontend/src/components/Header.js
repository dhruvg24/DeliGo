import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import { FaUserAlt } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";
const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  // to get the image when a person is logged in everywhere need to get the data from redux -> using useSelector
  const userData = useSelector((state) => state.user);
  console.log(userData.email);

  const dispatch = useDispatch();
  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
    //  whatever will be the prev state will be set to reverse of it
  };

  const handleLogout = () => {
    // when we login our data is set to redux , when we logout we need to remove the data from there
    dispatch(logoutRedux());
    toast("Logged Out successfully");
  };

  // console.log(process.env.REACT_APP_ADMIN_EMAIL)

  const cartItemNumber = useSelector((state)=>state.product.cartItem)

  // cartItem array is present in redux
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 py-2 bg-white">
      {/* for desktop */}
      <div className="flex items-center h-full justify-between">
        {/* justify content between will set them apart */}
        <Link to={""}>
          <div className="h-12">
            <img src={logo} alt="deliGo-logo" className="h-full" />
          </div>
        </Link>

        {/* navbar leftover part */}

        <div className="flex items-center gap-4 md:gap-7">
          {/* to set the items in center */}
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            {/* navbar is hidden in mobile version */}
            {/* this will contain the links as we click */}
            <Link to={""}>Home</Link>
            <Link to={"menu/64ca902655132be4862a6e99"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              {/* now also need to add the number of cart items getting displayed */}
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 p-0 m-0 rounded-full text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className="text-slate-600 " onClick={handleDropDown}>
            {/* icon for user */}
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showDropDown && (
              // {/* now for options in user icon */}
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {/* by giving flex-col New Product and Login will come in different lines */}

                {
                  // need to ensure that email id of admin is only allowed to update new product
                  userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <Link
                      to={"newproduct"}
                      className="whitespace-nowrap 
                cursor-pointer px-2"
                    >
                      New Product
                    </Link>
                  )
                  // this userData.email is from redux
                  // if it matches with admin email then new product link appears else not
                }

                {/* whitespace-nowrap will not allow text to get wrapped */}

                {
                  // display logout if image exists
                  userData.image ? (
                    <p
                      className="cursor-pointer text-white px-2 bg-red-500 "
                      onClick={handleLogout}
                    >
                      Logout ({userData.firstName})
                    </p>
                  ) : (
                    <Link
                      to={"login"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      Login
                    </Link>
                  )
                }

                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  {/* navbar is hidden in mobile version */}
                  {/* this will contain the links as we click */}
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/64ca902655132be4862a6e99"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* for mobile */}
    </header>
  );
};

export default Header;
