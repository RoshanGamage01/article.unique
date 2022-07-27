import ArticleList from "../components/ArticleList";
import Navbar from "../components/Navbar";
import RecentPost from "../components/RecentPost";
import { Link } from "react-router-dom";
import "../styles/homepage.scss";
import Footer from "../components/Footer";
import SplashScreen from "../components/SplashScreen";
import { useState } from "react";

function Home() {
  const [overflow, setOverflow] = useState(true);
  setTimeout(()=>{
    setOverflow(false)
  }, 1000)
  return (
    <div style={overflow ? {height: "100vh",overflow: "hidden"} : {overflow: "scroll"}}>
      <SplashScreen visible={overflow}/>
      <Navbar />
      <RecentPost />
      <ArticleList limit={6}/>
      <Link to="/article" className="btn-see-all-article">
          See all articles
      </Link>
      <Footer/>
    </div>
  );
}

export default Home;
