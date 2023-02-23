import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setErrMsg("");
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && navigate("/login");
    } catch (err) {
      setError(true);
      setErrMsg(err.response.data);
    }
  };
  return (
    <div
      className="bg-cover flex flex-col justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)),url("https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
        height: `calc(100vh - 50px)`,
      }}
    >
      <Helmet>
        <title>Register - OKK Blog React App</title>
      </Helmet>

      <span className="text-5xl">Register</span>
      <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        <label className="py-2" htmlFor="usename">
          Username
        </label>
        <input
          className="p-2 bg-white border-none"
          type="text"
          id="usename"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="py-2" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 bg-white border-none"
          type="email"
          id="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="py-2" htmlFor="password">
          Password
        </label>
        <input
          className="p-2 bg-white border-none"
          type="password"
          id="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-5 p-2 cursor-pointer border-none text-white rounded-lg  bg-teal-500 hover:bg-teal-800 "
          type="submit"
        >
          Register
        </button>
      </form>
      <button className="absolute top-[60px] right-6 cursor-pointer border-none p-2 text-white rounded-lg bg-red-400 hover:bg-red-700">
        <Link to="/login">Login</Link>
      </button>

      {error && <span className="text-red-600 mt-3">{errMsg}</span>}
    </div>
  );
}
