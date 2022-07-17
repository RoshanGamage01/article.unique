import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewArticleForm(props) {
  const [articleData, setArticleData] = useState({});
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("Select File");
  const navigate = useNavigate();

  async function btnPublishOnAction() {
    const payload = {
      title: articleData.title,
      description: articleData.desc,
      image: articleData.image,
      writer: props.userId,
    };

    const coverImage = file.image;
    const formData = new FormData();

    formData.append("title", articleData.title);
    formData.append("description", articleData.desc);
    formData.append("coverImage", coverImage);
    formData.append("writer", props.userId);

    await axios
      .post("http://localhost:3000/api/article/new", formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then((response) => {
        console.log(response.data);
        navigate("/me");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function addValue(event) {
    const key = event.target.name;
    const value = event.target.value;
    setArticleData((oldValue) => ({ ...oldValue, [key]: value }));
  }

  function addFile(event){
    setFileName(event.target.files[0].name);
    const key = event.target.name;
    const value = event.target.files[0];
    setFile((oldValue) => ({ ...oldValue, [key]: value }))
  }

  return (
    <div className="article-form">
      <div className="title">Write your Article</div>
      <label>Title</label>
      <input
        type={"text"}
        value={articleData.title || ""}
        onChange={addValue}
        placeholder="Title of your article"
        name="title"
      />
      <label>Content</label>
      <textarea
        value={articleData.desc || ""}
        onChange={addValue}
        name="desc"
      />
      <label className="get-cover-image">
        Cover Image<br/>
        <input
          type={"file"}
          placeholder="image url"
          value={articleData.image || ""}
          onChange={addFile}
          name="image"
        />
        <div>{fileName}</div>
      </label>
      <div className="btns">
        <button className="publish-btn" onClick={btnPublishOnAction}>
          Publish
        </button>
      </div>
    </div>
  );
}

export default NewArticleForm;
