import Post from "./Post";

export default function Posts({ posts }) {
  return (
    <div className="flex-[9] flex flex-wrap m-5">
      {/* posts*/}
      {posts.map((p, idx) => (
        <Post key={idx} post={p} />
      ))}
    </div>
  );
}
