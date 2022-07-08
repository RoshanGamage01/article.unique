import Navbar from "../components/Navbar";
import Articleprev from "../components/Articleprev";
import "../styles/articlepage.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function Article() {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    getArticles();
  }, []);

  async function getArticles() {
    await axios.get('http://localhost:3000/api/article/')
        .then(response=>{
            setArticles(response.data)
        })
  }

  return (
    <section>
      <Navbar />
      <div className="post">
            {
                articles.map(item => {
                    return <Articleprev data={item} key={item._id}/>
                })
            }
      </div>
    </section>
  );
}

export default Article;

