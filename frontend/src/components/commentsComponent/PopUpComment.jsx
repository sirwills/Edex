import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
const PopUpComment = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [post, setPost] = useState("");
  const { postId, commentId } = useParams();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:7000/api/post/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`http://localhost:7000/api/post/${postId}/comment`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const postData = postResponse.data;
        const commentsData = commentsResponse.data;

        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [postId, token, success]);

  const makeCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:7000/api/post/comment/${postId}`,
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
      setText("");
      setSuccess(true);
      navigate(`/${postId}/comment`);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Loggic in hadling comment deletion

  const deleteCommentHandler = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:7000/api/post/comment/${postId}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the deleted comment from the state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="w-2/3 h-auto m-auto justify-center items-center shadow-md rounded-lg">
      <div className="px-4 flex justify-between my-10">
        <p className="font-semibold">POST</p>
        <Link to={"/#"}>
          <button className="bg-yellow px-6 font-semibold rounded-md hover:text-white hover:bg-blue">
            Back
          </button>
        </Link>
      </div>
      <div className="w-full px-4">
        {post ? (
          <div key={post.postId}>
            <p className="font-semibold">{post.name}</p>
            <p>{post.text}</p>
          </div>
        ) : (
          "No post found"
        )}
      </div>

      <div className=" my-6 border px-4 rounded-sm">
        {Array.isArray(comments)
          ? comments.map((comment) => (
              <div key={comment.postId}>
                <div className="border my-2 rounded-lg p-4">
                  <div className="w-full flex justify-end">
                    {comment.user === user._id ? (
                      <span
                        onClick={() => deleteCommentHandler(comment._id)}
                        className="hover:text-red-500"
                      >
                        <AiOutlineDelete />
                      </span>
                    ) : null}
                  </div>
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))
          : "no comment found"}
      </div>

      <div className="mx-4 ">
        <form
          onChange={(e) => setText(e.target.value)}
          action="submit"
          className=" flex flex-col justify-center items-center"
        >
          <textarea
            className="w-full border rounded-lg p-4 outline-none"
            placeholder="Enter your comment here"
            name=""
            id=""
          ></textarea>
          <button
            onClick={makeCommentHandler}
            className="w-3/4 bg-blue text-white font-semibold rounded-lg my-4 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopUpComment;
