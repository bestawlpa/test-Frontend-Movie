import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-[#1E201E] px-40 w-full border-gray-200 dark:bg-gray-900 sticky top-0 ">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 ">
        <div className=" flex w-[620px] justify-between">
          <div className=" h-full flex items-center ">
            <Link
              to={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse w-[300px]"
            >
              <span
                className="self-center text-5xl font-extrabold whitespace-nowrap text-[#c10909]"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: "2px",
                  textShadow:
                    "2px 2px 3px rgba(255, 255, 255, 0.7), 0px 0px 6px rgba(255, 255, 255, 0.9), -4px -4px 2px rgba(255, 255, 255, 0.5)",
                }}
              >
                Netmovie
              </span>
            </Link>
          </div>

          <div className=" font-extrabold text-xl w-[350px] flex justify-around items-center text-[#FFFFFF] ">
            <Link to={"/"}>
              <div>Home</div>
            </Link>
            <Link to={"/popular"}>
              <div>Popular</div>
            </Link>

            <Link to={"/cart"}>
              <div>
                <img
                  src="./cart-svgrepo-com (3).svg"
                  alt=""
                  className=" w-[30px] h-[30px]"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className=" flex justify-end items-center w-[400px] h-[50px] text-white font-extrabold ">
          <Link to={"/search"}>
            <div className=" w-[30px] h-[30px] bg-white  hover:text-white rounded-full flex items-center justify-center mr-7">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </Link>

          <Link to={"/order"}>
            <div>Order</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
