import axios from "axios";
import { Context } from "context/AuthContext";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div
      className="bg-cover flex flex-col justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)),url("https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")`,
        height: `calc(100vh - 50px)`,
      }}
    >
      <Helmet>
        <title>Login - OKK Blog React App</title>
      </Helmet>

      <span className="text-5xl">Login</span>
      <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        <label className="py-2" htmlFor="username">
          Username
        </label>
        <input
          className="p-2 bg-white border-none"
          type="username"
          id="username"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label className="py-2" htmlFor="password">
          Password
        </label>
        <input
          className="p-2 bg-white border-none"
          type="password"
          id="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button
          className="mt-5 p-2 cursor-pointer border-none text-white rounded-lg bg-red-400 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-200"
          type="submit"
          disabled={isFetching}
        >
          Login
        </button>
      </form>
      <button className="absolute top-[60px] right-6 bg-teal-500 hover:bg-teal-800 cursor-pointer border-none p-2 text-white rounded-lg">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
}
