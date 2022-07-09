import Navbar from "../components/Navbar";
import Articleprev from "../components/Articleprev";
import "../styles/articlepage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import searchIco from "../icons/search_FILL0_wght400_GRAD200_opsz40.png"

function Article() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  async function getArticles() {
    await axios.get('http://localhost:3000/api/article/')
        .then(response=>{
            setArticles(response.data)
        }).catch(error => {
          console.log(error.response.data)
        })
  }

   

  return (
    <section>
      <Navbar />
      <div className="serch-bar">
          <input text="text" placeholder="Search"/>
          <img src={searchIco} alt="search-ico" />
      </div>
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

