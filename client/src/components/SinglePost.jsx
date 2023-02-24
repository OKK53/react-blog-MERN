import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { Context } from "context/AuthContext";
import TextareaAutosize from "react-textarea-autosize";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const credentials = {
    withCredentials: true,
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, credentials);
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `/posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        },
        credentials
      );
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="flex-[9]">
      <div className="p-5 pr-0 flex flex-col">
        {post.photo && (
          <img
            className="w-full h-[300px] rounded-md object-cover"
            src={PF + post.photo}
            alt="singlePostImage"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            className="m-2 font-lora text-3xl text-gray-500 text-center focus:outline-none border-b"
          />
        ) : (
          <h1 className="text-center font-lora m-2 text-2xl">
            {title}
            {post.username === user?.username && (
              <div className="flex float-right gap-x-2">
                <FiEdit
                  className="cursor-pointer text-teal-500"
                  onClick={() => setUpdateMode(true)}
                />
                <RiDeleteBinLine
                  className="cursor-pointer text-red-500"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}

        <div className="flex mb-5 justify-between text-yellow-500 font-varela">
          <span>
            Author:
            <Link to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>{" "}
          <span>{new Date(post.createdAt).toDateString()}</span>{" "}
        </div>
        {updateMode ? (
          <TextareaAutosize
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="text-gray-500 leading-6 focus:outline-none"
          />
        ) : (
          <p className="text-gray-600 leading-6 first-letter:ml-5 first-letter:text-3xl first-letter:font-semibold">
            {desc}
          </p>
        )}
        {updateMode && (
          <button
            className="border-none bg-teal-700 p-1 w-20 text-white rounded-md cursor-pointer self-end mt-5"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}
