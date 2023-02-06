import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20">
      <Helmet>
        <title>About - OKK Blog React App</title>
      </Helmet>
      <h1 className="text-3xl font-semibold antialiased">This is about Page</h1>
      <Link to="/" className="mt-8">
        <p className="text-blue-400 cursor-pointer hover:text-blue-800">
          See all posts...
        </p>
      </Link>
    </div>
  );
}
