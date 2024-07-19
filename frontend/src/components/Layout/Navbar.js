import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
    };

    return (
        <nav>
            <h1>Todo App</h1>
            <ul>
                {isAuthenticated ? (
                    <li>
                        <a onClick={onLogout} href="#!">
                            Logout
                        </a>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
