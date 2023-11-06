import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:7000/api/login`, {
        email,
        password,
      });

      const data = await response.data;
      console.log(data);

      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const visibility = () => {
    setShow(!show);
  };
  return (
    <div className="w-full h-[90vh] bg-blue flex justify-center items-center ">
      <div className="w-[50%] h-[70vh] flex shadow-xl bg-white rounded-lg p-6">
        <div className="w-[50%] lg:flex justify-center items-center md:hidden">
          <img src="./login-a.png" className="md:hidden lg:flex" alt="" />
        </div>

        <div className="flex items-center w-[50%] flex-col justify-center">
          <h1 className="flex text-center mb-6 text-3xl font-semibold">
            Login
          </h1>
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="w-[70%] items-center flex flex-col"
          >
            <div className="border border-solid w-full h-10 flex items-center pr-2 pl-2 rounded">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="text-sm outline-none "
              />
            </div>

            <div className="border border-solid w-full h-10 flex items-center justify-between pr-2 pl-2 mt-4 rounded">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={!show ? "password" : "text"}
                placeholder="Enter password"
                className="text-sm outline-none"
              />
              <button onClick={visibility}>
                {!show ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <p className="text-center text-sm mt-2 text-blue">
              Forgotten password?
            </p>

            <button
              type="submit"
              className="w-full h-8 rounded-md bg-yellow mt-4 text-white"
            >
              Login
            </button>
          </form>

          <p className="text-xs mt-4">
            Dont have an account?{" "}
            <span className="text-sky-600">
              <a href="/register">Create an account</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
