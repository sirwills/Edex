import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { AiOutlineLogin, AiOutlineClose } from "react-icons/ai";
import { MdJoinLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [showbar, setShowBars] = useState(false);

  const barsVisibility = (e) => {
    e.preventDefault();
    setShowBars(!showbar);
  };

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/login");
      console.log(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full h-16 bg-blue flex items-center justify-between pl-24 pr-24 relative">
      <Link to="/" className="font-semibold text-white">
        Edex
      </Link>
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
          {user ? (
            <button onClick={handleLogout}>
              <Link to="/login">Logout</Link>
            </button>
          ) : (
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-yellow"
                >
                  <AiOutlineLogin className="text-black" />
                  Login
                </Link>
              </li>

              <li className="">
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-yellow"
                >
                  <MdJoinLeft className="text-black" />
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <button onClick={barsVisibility} className={`lg:hidden`}>
        {" "}
        {!showbar ? (
          <FaBars className={`lg:hidden`} />
        ) : (
          <AiOutlineClose className={`lg:hidden`} />
        )}
      </button>
    </div>
  );
};

export default Nav;
