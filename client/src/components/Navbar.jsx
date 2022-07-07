import '../styles/navbar.scss';
import { Link, useNavigate } from 'react-router-dom';



function Navbar(){
    const navigate = useNavigate();

    function isSignedIn(){
        if(localStorage.getItem('auth-token')) return true;
        return false;
    }

    function btnLogOutOnAction(){
        localStorage.removeItem('auth-token');
        navigate("/")
    }

    return (
        <nav>
            <span className='logo'><Link to="/">UniqueArticle</Link></span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li style={isSignedIn() ? {display: 'none'} : {display: 'block'}}><Link to="/register">Register</Link></li>
                <li style={isSignedIn() ? {display: 'none'} : {display: 'block'}}><Link to="/login">Log In</Link></li>
                <li style={isSignedIn() ? {display: 'block'} : {display: 'none'}}><Link to="/me">Profile</Link></li>
                <li style={isSignedIn() ? {display: 'block'} : {display: 'none'}} onClick={btnLogOutOnAction}>Log out</li>
            </ul>
        </nav>
    )
}

export default Navbar;