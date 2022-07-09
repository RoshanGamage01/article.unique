import { useState } from "react";
import axios from "axios";
import "../styles/register_and_login_form.scss";
import { useNavigate } from "react-router-dom";

function Registerform() {
  const [data, setData] = useState({});
  const [res, setRes] = useState({});
  const navigate = useNavigate();

  function btnRegisterOnAction() {
    const payload = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        profileImage: data.image
      }
    
    try{
        axios.post("http://localhost:3000/api/user/register", payload)
            .then((result) => {
                setRes(oldValue => ({...oldValue, data: result.data.message, status: result.status}))
                localStorage.setItem('auth-token', result.data.token)
                navigate("/")
            })
            .catch((error) => {
                setRes(oldValue => ({...oldValue, data: error.response.data, status: error.response.status}))
            });
    }catch (err){
        console.log(err.message)
    }

    
  }

  function addValue(event) {
    const key = event.target.name;
    const value = event.target.value;
    setData((oldValue) => ({ ...oldValue, [key]: value }));
  }



  return (
    <section className="form">
      <div className="title">Register</div>
      <div className={`alert ${res.status === 200 ? "alert-done" : "alert-error"}`} style={res.data ? {display:'block'} : {display:'none'}}>{ res.data }</div>
      <div className="form-main">
        <div className="form-get-name">
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={data.firstName}
              onChange={addValue}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={data.lastName}
              onChange={addValue}
            />
          </div>
        </div>
        <div className="form-get-image">
          <label>Profile</label>
          <input type={"text"} placeholder="URL" value={data.image || ''} name="image" onChange={addValue}/>
          <button>Upload Image</button>
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
          <button onClick={btnRegisterOnAction}>Register</button>
        </div>
      </div>
    </section>
  );
}

export default Registerform;
