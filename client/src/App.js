import Topbar from "components/Topbar";
import Register from "pages/Register";
import Login from "pages/Login";
import Settings from "pages/Settings";
import Write from "pages/Write";
import Home from "pages/Home";
import About from "pages/About";
import Contact from "pages/Contact";
import Single from "pages/Single";
import Page404 from "pages/Page404";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "context/AuthContext";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={(user && <Write />) || <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
