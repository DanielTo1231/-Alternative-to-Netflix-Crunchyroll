import { Link } from "react-router-dom";

export function Navbar() {
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
                        <Link className="navbar-item" to="/signup">
                            Sign Up
                        </Link>
                        <Link className="navbar-item" to="/login">
                            Log in
                        </Link>
                        <Link className="navbar-item" to="/about">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
