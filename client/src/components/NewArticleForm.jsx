import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewArticleForm(props) {
  const [articleData, setArticleData] = useState({});
  const navigate = useNavigate();

  async function btnPublishOnAction() {
    const payload = {
      title: articleData.title,
      description: articleData.desc,
      image: articleData.image,
      writer: props.userId
    };
    
    await axios.post('http://localhost:3000/api/article/new', payload)
        .then(response => {
            console.log(response.data)
            navigate("/me")
        })
        .catch(error => {
            console.log(error.response.data)
        })
  }

  function addValue(event) {
    const key = event.target.name;
    const value = event.target.value;
    setArticleData((oldValue) => ({ ...oldValue, [key]: value }));
  }

  return (
    <div className="article-form">
      <div className="title">
        <label>Title</label>
        <input
          type={"text"}
          value={articleData.title || ""}
          onChange={addValue}
          placeholder="Title of your article"
          name="title"
        />
      </div>
      <div className="content">
        <label>Content</label>
        <textarea
          value={articleData.desc || ""}
          onChange={addValue}
          name="desc"
        />
      </div>
      <input
        type={"text"}
        placeholder="image url"
        value={articleData.image || ""}
        onChange={addValue}
        name="image"
      />
      <div className="btns">
        <button className="cover-image-btn">Add Cover Image</button>
        <button className="publish-btn" onClick={btnPublishOnAction}>Publish</button>
      </div>
    </div>
  );
}

export default NewArticleForm;
