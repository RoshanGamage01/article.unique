import "../styles/navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    if (isSignedIn()) {
      axios
        .get("https://article-unique.herokuapp.com/api/user/me", {
          headers: { "x-auth-token": token },
        })
        .then((response) => {
          setProfile(response.data.me);
        })
        .catch((error) => console.log(error.response.data));
    }
  }, []);

  function isSignedIn() {
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
        <li style={isSignedIn() ? { display: "none" } : { display: "block" }}>
          <Link to="/register">Register</Link>
        </li>
        <li style={isSignedIn() ? { display: "none" } : { display: "block" }}>
          <Link to="/login">Log In</Link>
        </li>
        <li style={isSignedIn() ? { display: "block" } : { display: "none" }}>
          <div className="profile-link">
            <Link to="/me">
              <div
                className="profile-photo"
                style={{ background: `url(${profile.profileImage})` }}
              ></div>
            </Link>
            <div className="navbar-profile-options">
              <Link to="/me">{profile.firstName}'s Profile</Link>
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
