import Sidebar from "components/Sidebar";
import { BiUserCircle } from "react-icons/bi";
import { Context } from "context/AuthContext";
import { useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="grid grid-col-1 md:flex">
      <Helmet>
        <title>Settings - OKK Blog React App</title>
      </Helmet>
      {/*settings*/}
      <div className="flex-[9] p-5">
        {/*settingsWrapper*/}
        <div className="flex items-center justify-between">
          {/*settingsTitle*/}
          <span className="text-3xl mb-5 text-red-300">
            {/*settingsUpdateTitle*/}Update Your Account
          </span>
          <span className="text-red-600 text-sm cursor-pointer">
            {/*settingsDeleteTitle*/}Delete Your Account
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/*settingsForm*/}
          <label className="mt-5" htmlFor="">
            Profile Picture
          </label>
          <div className="flex items-center my-2">
            {/*settingsPP*/}
            <img
              className="w-16 h-16 rounded-2xl object-cover"
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic.length === 0
                  ? PF + "PP_Logo.png"
                  : PF + user.profilePic
              }
              alt="profilePic"
            />
            <label className="mt-5" htmlFor="fileInput">
              <BiUserCircle className="w-6 h-6 p-1 rounded-[50%] border-none bg-red-400 text-white flex items-center justify-center ml-2 cursor-pointer" />
              {/*settingsPPicon*/}
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden text-gray-400"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="mt-5 text-xl font-medium antialiased">
            Username
          </label>
          <input
            className="text-gray-400 my-2 h-7 border-b"
            type="text"
            required
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="mt-5 text-xl font-medium antialiased">Email</label>
          <input
            className="text-gray-400 my-2 h-7 border-b"
            type="email"
            required
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mt-5 text-xl font-medium antialiased">
            Password
          </label>
          <input
            className="text-gray-400 my-2 h-7 border-b"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-36 items-center border-none rounded-lg text-white font-medium bg-teal-500 hover:bg-teal-800 p-2 mt-5 cursor-pointer self-center flex justify-center transition-all"
            type="submit"
          >
            Update
          </button>
          {success && (
            <span className="text-green-600 text-center mt-3">
              Profile has been updated...
            </span>
          )}
          {/*settingsSubmit*/}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
