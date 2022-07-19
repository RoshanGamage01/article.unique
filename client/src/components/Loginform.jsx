import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register_and_login_form.scss";

function Loginform() {
  const [data, setData] = useState({});
  const [res, setRes] = useState({})
  const navigate = useNavigate();

  function btnLoginOnAction() {
    axios.post('https://article-unique.herokuapp.com/api/login', data)
        .then(result => {
          setRes(oldValue => ({...oldValue, data: result.data.message, status: result.status}))
          localStorage.setItem('auth-token', result.data.token);
          navigate("/me");
        })
        .catch(error => {
          setRes(oldValue => ({...oldValue, data: error.response.data, status: error.response.status}))
        })
  }

  function addValue(event) {
    const key = event.target.name;
    const value = event.target.value;
    setData((oldValue) => ({ ...oldValue, [key]: value }));
  }

  return (
    <section className="form">
      <div className="title">Log In</div>
      <div className={`alert ${res.status === 200 ? "alert-done" : "alert-error"}`} style={res.data ? {display:'block'} : {display:'none'}}>{ res.data }</div>

      <div className="form-main">
        <div className="form-get-security">
          <label>E-mail</label>
          <input
            type={"email"}
            placeholder="example@example.com"
            name="email"
            value={data.email || ''}
            onChange={addValue}
          />
          <label>Password</label>
          <input
            type={"password"}
            placeholder="Password"
            name="password"
            value={data.password || ''}
            onChange={addValue}
          />
        </div>
        <div className="btn">
          <button onClick={btnLoginOnAction}>Log In</button>
        </div>
      </div>
    </section>
  );
}

export default Loginform;
