import { IoIosAdd } from "react-icons/io";
import { useState, useContext } from "react";
import { Context } from "context/AuthContext";
import axios from "axios";
import { Helmet } from "react-helmet";
import TextareaAutosize from "react-textarea-autosize";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="pt-12">
      <Helmet>
        <title>Write - OKK Blog React App</title>
      </Helmet>
      {/*write */}
      {file && (
        <img
          className="ml-36 w-[70vw] h-[250px] rounded-lg object-cover"
          src={URL.createObjectURL(file)}
          alt="writeImage"
        />
      )}
      <form className="relative" onSubmit={handleSubmit}>
        {/*writeForm */}
        <div className="ml-36 flex items-center">
          {/*writeFormGroup */}
          <label htmlFor="fileInput">
            <IoIosAdd className="w-7 h-7 rounded-[50%] border flex items-center justify-center text-xl cursor-pointer text-gray-600" />
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="text-3xl p-5 w-[50vw] focus:outline-none"
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/*writeInput */}
        </div>
        <div className="ml-36 flex items-center">
          {/*writeFormGroup */}
          <TextareaAutosize
            className="text-3xl p-5 w-[70vw] focus:outline-none text-inherit"
            placeholder="Tell your story..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></TextareaAutosize>
          {/*writeFormGroup  writeText*/}
          <button
            type="submit"
            className="absolute top-5 right-12 text-white bg-teal-700 p-2 border-none rounded-lg cursor-pointer font-medium"
          >
            {/*writeSubmit */}Publish{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
