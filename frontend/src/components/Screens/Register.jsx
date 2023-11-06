import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/authSlice";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("Please confirm password and try again");
      } else {
        const response = await axios.post(
          `http://localhost:7000/api/register`,
          {
            username,
            email,
            password,
          }
        );
        const data = await response.data;
        dispatch(register(data));
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full h-[90vh] bg-blue flex justify-center items-center ">
      <div className="w-[50%] h-[70vh] flex shadow-xl bg-white rounded-lg p-6">
        <div className="w-[50%] flex justify-center items-center">
          <img src="./register.png" className="" alt="" />
        </div>

        <div className="flex items-center w-[50%] flex-col justify-center">
          <h1 className="flex text-center mb-6 text-3xl font-semibold">
            Sign Up
          </h1>
          <form
            action=""
            onSubmit={handleRegister}
            className="w-[70%] items-center flex flex-col"
          >
            <div className="border border-solid w-full h-10 flex items-center pr-2 pl-2 rounded">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Fullname"
                className="text-sm outline-none "
              />
            </div>
            <div className="border border-solid w-full h-10 flex items-center pr-2 pl-2 rounded mt-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email address"
                className="text-sm outline-none "
              />
            </div>

            <div className="border border-solid w-full h-10 flex items-center justify-between pr-2 pl-2 mt-4 rounded">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="text-sm outline-none"
              />
              {/* <AiFillEyeInvisible /> */}
            </div>
            <div className="border border-solid w-full h-10 flex items-center justify-between pr-2 pl-2 mt-4 rounded">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                className="text-sm outline-none"
              />
              {/* <AiFillEyeInvisible /> */}
            </div>

            <p className="text-center text-sm mt-2 text-blue">
              Forgotten password?
            </p>

            <button
              type="submit"
              className="w-full h-8 rounded-md bg-yellow mt-4 text-white"
            >
              Sign up
            </button>
          </form>

          <p className="text-xs mt-4">
            Already have an account?{" "}
            <span className="text-sky-600">
              <a href="/login">Login</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
