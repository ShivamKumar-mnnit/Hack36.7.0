import React from "react";
import { MenuIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Header() {
  const authToken = localStorage.getItem("authToken");

  return (
    <header className="container flex justify-between shadow-md md:shadow-none h-20 ">
      <img
        className="md:hidden lg:inline-flex"
        src="./images/logo-full.svg"
        alt=""
        width="180"
      />
      <img
        className="hidden md:inline-block lg:hidden"
        src="./images/logo.svg"
        alt=""
        width="45"
      />
      <div className="flex items-center">
        <MenuIcon className="h-10 md:hidden" />
        <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
          {/* Display different buttons based on authToken existence */}
          {!authToken && (
            <>
              <button className="secondary-button">Sign in</button>
              <button className="primary-button">Sign up</button>
            </>
          )}
          {authToken && (
            <>
              <button className="primary-button">Dashboard</button>
              <Link to="/dashboard" className="primary-button">
                Map
              </Link>
            </>
          )}
          {/* <div className="hidden max-w-xl md:grid gap-4 grid-cols-4 text-right"> */}
          {/* </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
