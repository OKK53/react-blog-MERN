import Header from "components/Header";
import Posts from "components/Posts";
import Sidebar from "components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <div>
      <Helmet>
        <title>Home - OKK Blog React App</title>
        <meta name="description" content="Home - OKK Blog React App"></meta>
      </Helmet>
      <Header />
      <div className="grid grid-col-1 md:flex">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
}
