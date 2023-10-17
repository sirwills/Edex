import React from "react";
import { CiLogin } from "react-icons/ci";

const Hero = () => {
  return (
    <div className="w-full flex justify-between gap-10  items-center bg-blue">
      <section className=" w-[50%] p-2 ml-20 rounded-md">
        <h1 className="text-7xl text-white">Welcome to Edex</h1>
        <p className="text-white mt-10">
          Discover limitless learning by connecting with diverse minds. Learn,
          innovate, and expand your horizons collaboratively. <br />
          Why Choose Us:
          <br /> Diversity Unleashed: Cross-disciplinary collaboration. <br />{" "}
          Interactive Learning: Real-time discussions, projects,
          knowledge-sharing. <br /> Vast Resources: Rich library of articles,
          videos, and lectures. <br /> Mentorship: Learn from industry leaders.{" "}
          <br /> Join us to redefine education. Learn, grow, and create
          together!
        </p>
        <div className="flex gap-10">
          <button className="bg-yellow px-10 py-2 flex items-center mt-10">
            <a href="/about">Learn More..</a>
          </button>
          <button className="bg-yellow px-10 py-2 flex items-center mt-10">
            <a className="flex items-center" href="/register">
              Join Now <CiLogin />
            </a>
          </button>
        </div>
      </section>

      <section className="w-[50%] mr-20 ">
        <img className="rounded-lg" src="./collab.png" alt="" />
      </section>
    </div>
  );
};

export default Hero;
