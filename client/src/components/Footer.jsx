import "../styles/footer.scss";
import facebookIcon from "../icons/facebook.png";
import youtubeIcon from "../icons/youtube.png";
import instaIcon from "../icons/instagram.png";

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="aboutus">
          <div className="aboutus-caption">About us</div>
          <div className="aboutus-desc">
          uniquefeelings2020@gmail.com
          https://www.facebook.com/uniqefeelings
          </div>
        </div>
        <ul className="social-media">
          <li>
            <a href="https://www.facebook.com/uniqefeelings">
              <img src={facebookIcon} width="35px" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/uniqefeelings">
              <img src={youtubeIcon} width="30px" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/uniqefeelings">
              <img src={instaIcon} width="30px" />
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <div className="copy">Design and code by Roshan Gamage | unique developers</div>
    </footer>
  );
}

export default Footer;
