import React from "react";
import { FaHome, FaWpexplorer, FaUserAlt } from "react-icons/fa";
import { BiSolidMessageSquare } from "react-icons/bi";
import { Link } from "react-router-dom";

const HomeNav = () => {
  return (
    <nav className=" w-[20%] h-[50%] x items-center ml-20">
      <ul className="flex flex-col gap-10 mt-10 ">
        <li>
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <FaHome />
            Home
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-2 font-semibold" to="/explore">
            <FaWpexplorer />
            Explore
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-2 font-semibold" to="/profile">
            <FaUserAlt />
            Profile
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-2 font-semibold"
            to="/messages"
          >
            <BiSolidMessageSquare />
            Message
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
