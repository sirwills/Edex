import React from "react";
// import Nav from "../NavBar/Nav";
import Hero from "../Hero/Hero";
import { useSelector } from "react-redux";
import Home from "./Home";
// import { Route } from "react-router-dom";

const HomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {user ? (
        <div>
          <Home />{" "}
        </div>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default HomeScreen;
