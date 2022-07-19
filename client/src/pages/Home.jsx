import ArticleList from "../components/ArticleList";
import Navbar from "../components/Navbar";
import RecentPost from "../components/RecentPost";
import { Link } from "react-router-dom";
import "../styles/homepage.scss";
import Footer from "../components/Footer";

function Home() {

  return (
    <div>
      <Navbar/>
      <RecentPost/>
      <ArticleList limit={6}/>
      <Link to="/article" className="btn-see-all-article">
          See all articles
      </Link>
      <Footer/>
    </div>
  );
}

export default Home;
