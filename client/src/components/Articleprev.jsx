import { Link } from "react-router-dom";
import "../styles/article_card.scss";

function Articleprev(props) {
  const desc = props.data.description;
  return (
    <Link to={"/article/"+props.data._id}>
      <div className="article-prev-card">
        <img src={props.data.image} alt="article cover" />
        <div className="article-prev-card-content">
          <div className="article-prev-card-title">{props.data.title}</div>
          <div className="article-prev-card-time">
            {props.data.time.slice(0, 10)}
          </div>
          <div className="article-prev-card-desc">
            {desc.slice(0, 100)}...{" "}
            <strong style={{ cursor: "pointer" }}>Reade more &gt;</strong>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Articleprev;
