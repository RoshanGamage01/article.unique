import "../styles/navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("auth-token");
  const [userExist, setUserExist] = useState(true);

  useEffect(() => {
    if (isTokenAvilable()) {
      axios
        .get("http://localhost:3000/api/user/me", {
          headers: { "x-auth-token": token },
        })
        .then((response) => {
          setUserExist(true)
          setProfile(response.data.me);
        })
        .catch((error) => {
          localStorage.removeItem("auth-token")
          setUserExist(false)
        });
    }else{
      setUserExist(false)
    }
  }, []);

  function isTokenAvilable() {
    if (token) return true;
    return false;
  }

  function btnLogOutOnAction() {
    localStorage.removeItem("auth-token");
    navigate("/");
  }
  return (
    <nav>
      <span className="logo">
        <Link to="/">UniqueArticle</Link>
      </span>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/article">Articles</Link>
        </li>
        <li style={userExist ? { display: "none" } : { display: "block" }}>
          <Link to="/register">Register</Link>
        </li>
        <li style={userExist ? { display: "none" } : { display: "block" }}>
          <Link to="/login">Log In</Link>
        </li>
        <li style={userExist ? { display: "block" } : { display: "none" }}>
          <div className="profile-link">
            <Link to="/me">
              <div
                className="profile-photo"
                style={{ background: `url(${profile.profileImage})` }}
              ></div>
            </Link>
            <div className="navbar-profile-options">
            <Link to={`/article/new/` + profile._id}>Create New Article</Link>
              <Link to="/me">Your Profile</Link>
              <Link to="/" onClick={btnLogOutOnAction}>
                Log out
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
