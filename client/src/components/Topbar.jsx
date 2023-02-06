import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "context/AuthContext";
import { IoIosMenu, IoIosClose } from "react-icons/io";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const [open, setOpen] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <nav className="w-full h-12 bg-white sticky top-0 z-50 flex items-center font-josefin transition-all">
      <div className="hidden flex-[3] md:flex items-center justify-center text-2xl gap-x-3 text-gray-600 ">
        <Link to="https://discord.com/invite/4xFZmc6uWK" target="_blank">
          <FaDiscord className="cursor-pointer hover:text-gray-900" />
        </Link>
        <Link to="https://github.com/OKK53" target="_blank">
          <IoLogoGithub className="cursor-pointer hover:text-gray-900" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/oguz-kagan-kamil/"
          target="_blank"
        >
          <IoLogoLinkedin className="cursor-pointer hover:text-gray-900" />
        </Link>
      </div>
      <div
        className="z-50 ml-3 text-3xl md:hidden"
        onClick={() => setOpen(!open)}
      >
        {(open && <IoIosClose />) || <IoIosMenu />}
      </div>
      <div className="flex-[6]">
        <ul className="hidden md:flex justify-center font-medium text-lg gap-x-5">
          <li className="cursor-pointer hover:text-blue-300">
            <Link to="/">HOME</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-300">
            <Link to="/about">ABOUT</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-300">
            <Link to="/contact">CONTACT</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-300">
            <Link to="/write">WRITE</Link>
          </li>

          {user && (
            <li
              className="cursor-pointer hover:text-blue-300"
              onClick={handleLogout}
            >
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="flex-[3] flex items-center justify-center gap-x-2">
        {user ? (
          <Link to="/settings">
            <img
              className="w-10 h-10 rounded-[50%] object-cover cursor-pointer"
              src={
                user.profilePic.length === 0
                  ? PF + "PP_Logo.png"
                  : PF + user.profilePic
              }
              alt="profilepicture"
            />
          </Link>
        ) : (
          <ul className="mr-3 md:pr-0 flex justify-center font-medium text-lg gap-x-5">
            <li className="cursor-pointer hover:text-blue-300">
              <Link to="/login">LOGIN</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-300">
              <Link to="/register">REGISTER</Link>
            </li>
          </ul>
        )}
      </div>
      {/* Mobile nav */}
      <ul
        className={`md:hidden bg-white fixed w-full h-full overflow-y-auto bottom-0 items-center py-24 pl-4 capitalize transition-all tracking-widest z-20 duration-500 ${
          open ? "left-0" : "left-[-100%]"
        }`}
      >
        <div className="flex flex-[9] flex-col gap-y-8">
          <Link
            to="/"
            className="hover:text-blue-500"
            onClick={() => setOpen(!open)}
          >
            HOME
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-500"
            onClick={() => setOpen(!open)}
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500"
            onClick={() => setOpen(!open)}
          >
            CONTACT
          </Link>
          <Link
            to="/write"
            className="hover:text-blue-500"
            onClick={() => setOpen(!open)}
          >
            WRITE
          </Link>
          {user && (
            <li
              className="cursor-pointer hover:text-blue-300"
              onClick={handleLogout}
            >
              LOGOUT
            </li>
          )}
        </div>
        <div className="flex-[3] flex gap-x-2 mt-10">
          {user ? (
            <Link to="/settings" onClick={() => setOpen(!open)}>
              <img
                className="w-10 h-10 rounded-[50%] object-cover cursor-pointer"
                src={
                  user.profilePic.length === 0
                    ? PF + "PP_Logo.png"
                    : PF + user.profilePic
                }
                alt="profilepicture"
              />
            </Link>
          ) : (
            <ul className="mr-3 md:pr-0 flex justify-center font-medium text-lg gap-x-5">
              <li className="cursor-pointer hover:text-blue-300">
                <Link to="/login" onClick={() => setOpen(!open)}>
                  LOGIN
                </Link>
              </li>
              <li className="cursor-pointer hover:text-blue-300">
                <Link to="/register" onClick={() => setOpen(!open)}>
                  REGISTER
                </Link>
              </li>
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
}
