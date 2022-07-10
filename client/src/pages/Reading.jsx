import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/reading.scss";

function Reading(props) {
  const linkProps = useParams();
  const writer = new URLSearchParams(useLocation().search);
  const [article, setArticle] = useState({});


  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get(`http://localhost:3000/api/article/${linkProps.id}`)
      .then((response) => {
        const data = response.data;
        data.time = data.time.slice(0, 10);
        setArticle(data);
      });
  }
  console.log();
  return (
    <section>
      <Navbar />
      <div className="article">
        <div
          className="article-cover"
          style={{ background: `url('${article.image}')` }}
        ></div>
        <div className="text-aria">
          <div className="title">{article.title}</div>
          <div className="time">{article.time}</div>
          <div className="desc">
            <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
          </div>
          <div className="profile-name">- {writer.get('writer')} -</div>
        </div>
      </div>
    </section>
  );
}

export default Reading;
