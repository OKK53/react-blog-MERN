import nessaImage from "assets/nessaImage.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="flex flex-col flex-[3] items-center m-5 pb-7 bg-zinc-50 rounded-xl ">
      <div className="flex flex-col items-center">
        <span className="m-2 p-1 w-[80%] border-y font-varela  text-[#222] font-semibold leading-5 text-center">
          ABOUT BLOG
        </span>
        <img className="mt-3 w-64 h-64" src={nessaImage} alt="nessaImage" />
        <p className="p-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          facilis quia natus assumenda dolores saepe aliquam inventore non odio
          unde quis, vitae minima earum fuga, illum quidem ex ea atque.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="m-2 p-2 w-[80%] border-y font-varela  text-[#222] font-semibold leading-5 text-center">
          CATEGORIES
        </span>
        <ul className="mb-7">
          {cats.map((c, idx) => (
            <Link key={idx} to={`/?cat=${c.name}`}>
              <li className="inline-block w-[50%] mt-4 cursor-pointer hover:text-blue-400 transition-all">
                {" "}
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <span className="m-2 p-1 w-[80%] border-y font-varela  text-[#222] font-semibold leading-5 text-center">
          FOLLOW US
        </span>
        <div className="mt-4 flex w-[250px] items-center justify-center text-lg">
          <Link to="https://discord.com/invite/4xFZmc6uWK" target="_blank">
            <FaDiscord className="ml-2 cursor-pointer hover:text-blue-400 transition-all" />
          </Link>
          <Link to="https://github.com/OKK53" target="_blank">
            <IoLogoGithub className="ml-2 cursor-pointer hover:text-blue-400 transition-all" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/oguz-kagan-kamil/"
            target="_blank"
          >
            <IoLogoLinkedin className="ml-2 cursor-pointer hover:text-blue-400 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
