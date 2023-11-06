import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaComment } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiRepost } from "react-icons/bi";
import PopUp from "../popUp/PopUp";
import { Link } from "react-router-dom";
import PopUpComment from "../commentsComponent/PopUpComment";

const PostsDisplay = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [showComment, setShowComment] = useState([]);
  //   const history = useHistory();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/post/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setPosts(data);
        setShowComment(new Array(data.length).fill(false));
      } catch (error) {
        console.error(error.message);
      }
    };

    getPost();
  }, [token]);

  const commentsVisibility = (index) => {
    setShowComment((prev) => {
      const updatedComments = [...prev];
      updatedComments[index] = !updatedComments[index];
      return updatedComments;
    });
  };

  return (
    <section className="w-full flex flex-col">
      {Array.isArray(posts)
        ? posts.map((post, index) => (
            <div
              className="w-full justify-center my-2 shadow-sm items-center flex flex-col"
              key={post._id}
            >
              <div className="w-full">
                <div className="w-full flex items-center">
                  <div className="w-12 h-12 overflow-hidden rounded-full ml-10 mr-4">
                    <img
                      src={user.avatar}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold">{post.name}</p>
                    <p className="">{post.text}</p>
                  </div>
                </div>
              </div>

              <div className="w-full items-center justify-center">
                {showComment[index] && <PopUpComment />}
              </div>
              <div className="w-full flex justify-between">
                <div className="w-full justify-between px-20 mt-6 flex items">
                  <Link
                    onClick={() => commentsVisibility(index)}
                    to={`/${post._id}/comment`}
                  >
                    <button className="flex items-center gap-1">
                      <FaComment /> {post.comments.length}
                    </button>
                  </Link>
                  <button>
                    <FcLikePlaceholder />
                  </button>
                  <button>
                    <BiRepost />
                  </button>
                </div>
              </div>
            </div>
          ))
        : "no post found"}
    </section>
  );
};

export default PostsDisplay;
