import Articleprev from "../components/Articleprev";
import { useState, useEffect } from "react";
import "../styles/articlelist.scss";
import axios from "axios";

function ArticleList(props) {
  let [articles, setArticles] = useState([]);
  const [state, setState] = useState(false) 

  if(!props.limit || props.limit === undefined || props.limit === 0){
    articles = articles
  }else{
    articles = articles.slice(0, props.limit)
  }
  

  useEffect(() => {
    getArticles();
  }, []);

  async function getArticles() {
    await axios
      .get("https://article-unique.herokuapp.com/api/article/")
      .then((response) => {
        setArticles(response.data);
        setState(true)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <section>
      <div className="article-list-title">Explore</div>
        <div className="post">
          <div className="msg" style={state ? {display: 'none'} : {display: 'block'}}>Loading Articles....</div>
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
