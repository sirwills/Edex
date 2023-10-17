import React from "react";
// import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { MdJoinLeft } from "react-icons/md";

const Nav = () => {
  return (
    <div className="w-full h-16 bg-blue flex items-center justify-between pl-24 pr-24">
      <p className="font-semibold text-white">Edex</p>
      <div className="flex gap-10 justify-between">
        <ul className="flex gap-10 text-white">
          <li className="">
            <a href="/" className="">
              Home
            </a>
          </li>

          <li className="hover:bg-inherit rounded-lg">
            <a href="/">About</a>
          </li>

          <li>
            <a href="/">Services</a>
          </li>

          <li>
            <a href="/">Contact Us</a>
          </li>
        </ul>

        <div className="ml- text-white">
          <ul className="flex gap-6">
            <li>
              <a href="/login" className="flex items-center gap-2 text-yellow">
                <AiOutlineLogin className="text-black" />
                Login
              </a>
            </li>

            <li className="">
              <a
                href="/register"
                className="flex items-center gap-2 text-yellow"
              >
                <MdJoinLeft className="text-black" />
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
