import '../styles/navbar.scss';
import { Link } from 'react-router-dom';


function Navbar(){


    return (
        <nav>
            <span className='logo'><Link to="/">UniqueArticle</Link></span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Log in</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;