import '../styles/navbar.scss';
import { Link } from 'react-router-dom';



function Navbar(){
    function isSignedIn(){
        if(localStorage.getItem('auth-token')) return true;
        return false;
    }

    return (
        <nav>
            <span className='logo'><Link to="/">UniqueArticle</Link></span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li style={isSignedIn() ? {display: 'none'} : {display: 'block'}}><Link to="/register">Register</Link></li>
                <li style={isSignedIn() ? {display: 'none'} : {display: 'block'}}><Link to="/login">Log In</Link></li>
                <li style={isSignedIn() ? {display: 'block'} : {display: 'none'}}><Link to="/me">Profile</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;