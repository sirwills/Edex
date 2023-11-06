import React, { useEffect, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PopUp = () => {
  const { token } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const { postId } = useParams();

  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/post/${postId}`
        );

        const data = response.data;

        setPost(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      console.log(postId);
      if (!postId) {
        console.error("postId is undefined");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:7000/api/post/${postId}/comment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        console.log(data);

        setComments(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchComments();
  }, [postId]);
  return (
    <div className="flex w-1/2 justify-center items-center bg-white bg-opacity-10 absloute rounded-md">
      <div className="w-full p-4 bg-blue bg-opacity-5 rounded-md shadow-md ">
        <div className="flex w-full justify-around">
          <p>Comments</p>

          <div className="w-full">
            {post ? <p key={post.postId}>{post.text}</p> : "no post found"}
          </div>
        </div>

        <div className="w-full flex  justify-center flex-col">
          <ul className="w-full">
            {Array.isArray(comments)
              ? comments.map((comment) => (
                  <li key={comment.postId}>
                    <div className="flex items-center">
                      <img
                        src="https://images.pexels.com/photos/3030716/pexels-photo-3030716.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        alt=""
                        className="h-12 mx-2"
                      />
                      <p className="font-semibold mt-4">{comment.name}</p>
                    </div>

                    <p className="text-sm">{comment.text}</p>
                  </li>
                ))
              : "no comments found"}
          </ul>
          <img src={user.avatar} alt="" />
          <div className="w-full mt-4">
            <form action="submit">
              <textarea
                className="w-full"
                placeholder="Enter your comment here"
                name=""
                id=""
              ></textarea>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
