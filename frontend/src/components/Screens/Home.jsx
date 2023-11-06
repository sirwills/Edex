// import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import HomeNav from "../HomeNav/HomeNav";
import PostsDisplay from "../PostDisplay/PostsDisplay";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  
  const submitIdea = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:7000/api/post",
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await res.data;
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <main className="flex justify-between w-full  ">
        <HomeNav />
        <section className="border w-[80%]">
          <div className="flex  w-full h-16 border items-center p-10">
            <div className="w-12 mr-4 object-contain h-12 border rounded-full overflow-hidden">
              <img
                src="https://images.pexels.com/photos/17503411/pexels-photo-17503411/free-photo-of-young-brunette-woman-in-white-lace-dress-holding-a-lily-flower.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=loadß"
                alt=""
                className="object-cover w-full h-full "
              />
            </div>
            <form onSubmit={submitIdea} className="flex gap-2 w-[80%] ">
              <textarea
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="w-full outline-none"
                placeholder="Share your idea"
              ></textarea>
              <button type="submit" className="px-4 ">
                <FaPaperPlane />
              </button>
            </form>
          </div>

          <PostsDisplay />
        </section>
      </main>
    </>
  );
};

export default Home;
