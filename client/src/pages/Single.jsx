import SinglePost from "components/SinglePost";
import Sidebar from "components/Sidebar";
import { Helmet } from "react-helmet";

export default function Single() {
  return (
    <div className="flex">
      <Helmet>
        <title>Single Post - OKK Blog React App</title>
      </Helmet>
      <SinglePost />
      <Sidebar />
    </div>
  );
}
