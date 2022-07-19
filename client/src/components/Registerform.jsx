import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "../styles/register_and_login_form.scss";

function Registerform() {
  const [res, setRes] = useState({});
  const [data, setData] = useState({});
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("Select Profile Image");
  const navigate = useNavigate()

  function addValue(event) {
    const key = event.target.name;
    const value = event.target.value;
    setData((oldValue) => ({ ...oldValue, [key]: value }));
  }

  function btnRegisterOnClick() {
    const imageFile = file.profileImage;
    const formData = new FormData();
    formData.append("firstName",data.firstName);
    formData.append("lastName",data.lastName);
    formData.append("email",data.email);
    formData.append("password", data.password);
    formData.append("profileImage", imageFile);

    try{
          axios.post("https://article-unique.herokuapp.com/api/user/register", formData, {headers: {'Content-Type': 'multipart/form-data'}})
              .then((result) => {
                  setRes(oldValue => ({...oldValue, data: result.data.message, status: result.status}))
                  localStorage.setItem('auth-token', result.data.token)
                  navigate("/")
                  // console.log(result.data)
              })
              .catch((error) => {
                  setRes(oldValue => ({...oldValue, data: error.response.data, status: error.response.status}))
              });
          }catch (err){
              console.log(err.message)
          }
  }

  function addFile(event){
    setFileName(event.target.files[0].name)
    const key = event.target.name;
    const value = event.target.files[0];
    setFile((oldValue) => ({ ...oldValue, [key]: value }))
  }

  return (
    <section className="form">
      <div className="title">Register</div>
      <div
        className={`alert ${res.status === 200 ? "alert-done" : "alert-error"}`}
        style={res.data ? { display: "block" } : { display: "none" }}
      >
        {res.data}
      </div>
      <div className="form-main">
        <div className="form-get-name">
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={data.firstName || ""}
              onChange={addValue}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName || ""}
              onChange={addValue}
            />
          </div>
        </div>
        {/* get image  */}
        <div className="form-get-image">
          <label>
            Label
            <input type={"file"} name="profileImage" onChange={addFile}/>
            <div>{fileName}</div>
          </label>
        </div>

        <div className="form-get-security">
          <label>E-mail</label>
          <input
            type={"email"}
            placeholder="example@example.com"
            name="email"
            value={data.email || ""}
            onChange={addValue}
          />
          <label>Password</label>
          <input
            type={"password"}
            placeholder="Password"
            name="password"
            value={data.password || ""}
            onChange={addValue}
          />
        </div>
        <div className="btn">
          <button onClick={btnRegisterOnClick}>Register</button>
        </div>
      </div>
    </section>
  );
}

export default Registerform;


