import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/reading.scss";

function Reading() {
  const linkProps = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get(`http://localhost:3000/api/article/${linkProps.id}`, {headers: {"x-auth-token": localStorage.getItem("auth-token")}})
      .then((response) => {
        const data = response.data;
        data.time = data.time.slice(0, 10);
        setArticle(data);
      });
  }

  return (
    <section>
      <Navbar />
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
    </section>
  );
}

export default Reading;
