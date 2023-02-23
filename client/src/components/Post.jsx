import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="w-[385px] mt-0 mx-6 mb-10">
      {post.photo && (
        <img
          className="w-full h-[280px] object-cover rounded-md"
          src={PF + post.photo}
          alt="postImage"
        />
      )}
      <div className="flex flex-col items-center text-center">
        <div>
          {post.categories.map((c) => (
            <span className="font-varela text-sm leading-5 mt-3 mr-2 cursor-pointer text-yellow-300">
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          <span className="font-josefin text-lg font-semibold mt-3 cursor-pointer">
            {post.title}
          </span>
        </Link>
        <hr />
        <span className="font-lora italic text-gray-400 mt-3">
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
