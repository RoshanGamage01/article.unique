import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/reading.scss";

function Reading() {
  const linkProps = useParams();
  const [article, setArticle] = useState({});
  const [error, setError] = useState()

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get(`https://uniquearticle.azurewebsites.net/api/article/${linkProps.id}`, {headers: {"x-auth-token": localStorage.getItem("auth-token")}})
      .then((response) => {
        const data = response.data;
        data.time = data.time.slice(0, 10);
        setArticle(data);
      }).catch(error => {
        console.log(error.response.data)
        setError(error.response.data)
      });
  }

  return (
    <section>
      <Navbar />
      <div className="msg" style={article.title === undefined ? {display: 'block'} : {display: 'none'}}>
        {!error ? "Loading Article.." : error}
      </div>
      <div className="article">
        <div
          className="article-cover"
          style={{ background: `url('${article.image}')` }}
        >
          <Link to={`/article/update/${linkProps.id}`} style={article.canEdit ? {display: 'flex'} : {display: 'none'}}>Edit Article</Link>
        </div>
        <div className="text-aria">
          <div className="title">{article.title}</div>
          <div className="time">{article.time}</div>
          <div className="desc">
            <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
          </div>
          <div className="profile-name">- {article.writer} -</div>
        </div>
      </div>
      <Footer/>
    </section>
  );
}

export default Reading;
