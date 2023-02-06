// import postImage from "assets/postImage.jpg";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="w-[385px] mt-0 mx-6 mb-10">
      {/* post*/}
      {post.photo && (
        <img
          className="w-full h-[280px] object-cover rounded-md"
          src={PF + post.photo}
          alt="postImage"
        />
      )}
      <div className="flex flex-col items-center text-center">
        {/* postInfo*/}
        <div>
          {/* postCats*/}
          {post.categories.map((c) => (
            <span className="font-varela text-sm leading-5 mt-3 mr-2 cursor-pointer text-yellow-300">
              {/* postcat*/}
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          <span className="font-josefin text-lg font-semibold mt-3 cursor-pointer">
            {/* posttitle*/} {post.title}
          </span>
        </Link>
        <hr />
        <span className="font-lora italic text-gray-400 mt-3">
          {/* postDate*/}
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p
        className="font-varela text-gray-600 leading-5 mt-3 overflow-hidden text-ellipsis postDesc "
        style={{
          overflow: `hidden`,
          textOverflow: `ellipsis`,
          display: `-webkit-box`,
          WebkitLineClamp: `4`,
          WebkitBoxOrient: `vertical`,
        }}
      >
        {post.desc}
      </p>
    </div>
  );
}
