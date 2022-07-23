import Articleprev from "../components/Articleprev";
import { useState, useEffect } from "react";
import "../styles/articlelist.scss";
import axios from "axios";

function ArticleList(props) {
  let [articles, setArticles] = useState([]);
  const [state, setState] = useState(false) 
  const [error, setError] = useState();

  if(!(!props.limit || props.limit === undefined || props.limit === 0)){
    articles = articles.slice(0, props.limit)
  }
  

  useEffect(() => {
    getArticles();
  }, []);

  async function getArticles() {
    await axios
      .get("http://localhost:3000/api/article/")
      .then((response) => {
        setArticles(response.data);
        setState(true)
      })
      .catch((error) => {
        setError("Articles not found")
      });
  }

  return (
    <section>
      <div className="article-list-title">Explore</div>
        <div className="post">
          <div className="msg" style={state ? {display: 'none'} : {display: 'block'}}>{!error ? "Loading Articles...." : error}</div>
          {articles.map((item) => {
            return (
              <Articleprev className="grid-item" data={item} key={item._id} />
            );
          })}
          {/* <div className="msg" style={articles.length != 0 ? {display: 'none'} : {display: 'block'}}>There are no article to show.</div> */}
        </div>
    </section>
  );
}

export default ArticleList;
