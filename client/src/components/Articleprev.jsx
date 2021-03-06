import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/article_card.scss";

function Articleprev(props) {
  const desc = props.data.description;
  const [writer, setWriter] = useState("")

  useEffect(()=>{
    axios.get(`https://uniquearticle.azurewebsites.net/api/user/${props.data.writer}`)
      .then(response => {
        setWriter(`${response.data.firstName} ${response.data.lastName}`)
      })
      .catch(error => console.log(error.response.data))
  }, [])

  return (
    <Link to={"/article/"+props.data._id}>
      <div className="article-prev-card">
        <div className="cover">
          <img src={props.data.image} alt="article cover" />
        </div>
        <div className="article-prev-card-content">
          <div className="article-prev-card-title">{props.data.title}</div>
          <div className="article-prev-card-time">
            {props.data.time.slice(0, 10)}
          </div>
          <div className="article-prev-card-desc">
            <p dangerouslySetInnerHTML={{__html: desc.slice(0, 100) + "<strong style={{ cursor: 'pointer' }}>.. Read more &gt;</strong>"}}></p>
          </div>
          <div className="profile-name">- {writer} -</div>
        </div>
      </div>
    </Link>
  );
}

export default Articleprev;
