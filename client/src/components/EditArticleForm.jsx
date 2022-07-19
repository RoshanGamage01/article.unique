import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditArticleForm(props) {
  const [articleData, setArticleData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://article-unique.herokuapp.com/api/article/${props.id}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        const data = response.data;
        setArticleData(data);
      });
  }, []);

  function addValues(event) {
    const key = event.target.name;
    const value = event.target.value;

    setArticleData((oldValue) => ({ ...oldValue, [key]: value }));
  }

  async function btnUpdateArticleOnChange(){
    await axios.put(`https://article-unique.herokuapp.com/api/article/update/${props.id}`, articleData, {headers: {"x-auth-token": localStorage.getItem("auth-token")}})
            .then(response => {
                navigate("/article/"+props.id)
            })
  }

  return (
    <div className="edit-article-form">
      <div className="title">Edit your article</div>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={articleData.title || ""}
          name="title"
          onChange={addValues}
        />
      </div>
      <div>
        <label>Descrtiption</label>
        <textarea
          value={articleData.description || ""}
          name= 'description'
          onChange={addValues}
        />
      </div>
      <button onClick={btnUpdateArticleOnChange}>Update Article</button>
    </div>
  );
}

export default EditArticleForm;
