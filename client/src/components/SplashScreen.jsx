import "../styles/splash_screen.scss"
import mainLogo from "../images/main-logo.jpeg"
import bg from "../images/splsh-bg.webp"

function SplashScreen(props){
    return(
        <section className="splash-screen" style={props.visible ? {backgroundImage: `linear-gradient(rgba(0 0 0 / 30%), rgba(0 0 0 / 30%)),url(${bg})`} : {display: "none"}}>
            <img src={mainLogo} alt="main-logo"/>
        </section>
    )
}

export default SplashScreen;

// style={props.visible ? {opacity: "100%"} : {opacity: "0%", display: "none"}}