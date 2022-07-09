import axios from "axios";
import { useEffect, useState } from "react";
import Articleprev from "../components/Articleprev";
import Navbar from "../components/Navbar";
import "../styles/profile.scss";
import add from "../icons/add_FILL0_wght400_GRAD0_opsz24.png"
import { Link } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState({
    me: { image: "", title: "", description: "" },
    article: [],
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get("http://localhost:3000/api/user/me", {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        try {
          return setUserData(response.data);
        } catch (ex) {
          console.log(ex);
        }
      })
      .catch((err) => console.log(err.response.data));
  }
  return (
    <section>
      <Navbar />
      <div className="profile">
        <div
          className="profile-photo"
          style={{ background: `url('${userData.me.profileImage}')` }}
        ></div>
        <div className="bio">
          <div className="user-name">
            {userData.me.firstName} {userData.me.lastName}
          </div>
          <div className="user-email">{userData.me.email}</div>
        </div>
        <button>Edit profile</button>
      </div>
      <div className="captions">
        <span>My Articles</span>
        <div>
            <img src={add} alt="icon"/>
            <Link to={`/article/new/`+userData.me._id}>Create New Article</Link>
        </div>
      </div>
      <div className="articles">
        {userData.article.map((item) => {
          return <Articleprev data={item} key={item._id} />;
        })}
      </div>
    </section>
  );
}

export default Profile;
