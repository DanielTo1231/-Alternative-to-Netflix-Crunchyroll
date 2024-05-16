import { Link } from "react-router-dom";
import { useAuth } from "../Auth";

export function Navbar() {
    const { isAuthenticated, clearAuthToken } = useAuth();

    const handleLogout = () => {
        clearAuthToken();
        window.location.href = "/Login";
    };

    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    TP2
                </Link>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        {!isAuthenticated ? (
                            <>
                                <Link className="navbar-item" to="/signup">
                                    Sign Up
                                </Link>
                                <Link className="navbar-item" to="/login">
                                    Log in
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="navbar-item" to="/history">
                                    History
                                </Link>
                                <Link className="navbar-item" to="/profile">
                                    Profile
                                </Link>
                                <Link className="navbar-item" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </>
                        )}
                        <Link className="navbar-item" to="/about">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
