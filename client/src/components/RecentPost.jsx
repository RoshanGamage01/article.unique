import "../styles/recent-article.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import loadingCoverImage from "../images/loading.gif";

function RecentPost() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    _id: "",
  });

  useEffect(() => {
    axios
      .get("https://uniquearticle.azurewebsites.net/api/article/post/recent")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <section>
      {
        data === undefined ? <div></div> :
        <div
          className="recent-article"
          style={{
            backgroundImage: `linear-gradient(rgba(0 0 0 / 30%), rgba(0 0 0 / 30%)), url(${!data.image ? loadingCoverImage : data.image})`,
          }}
        >
          <div className="title">{!data.title ? "No articles to show" : data.title}</div>
          <div
            className="desc"
            dangerouslySetInnerHTML={{
              __html: !data.description ? "Something went wrong, please try again later" : data.description.slice(0, 100) + ".. Read more..",
            }}
          ></div>
          <Link to={"/article/" + data._id} className="btn">
            Read full article
          </Link>
        </div>
      }
    </section>
  );
}

export default RecentPost;
