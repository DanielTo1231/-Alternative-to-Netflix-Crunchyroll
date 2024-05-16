import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAuthToken } = useAuth();

    const handleLogin = async () => {
        setError("");

        if (!username || !password) {
            setError("Username et mot de passe sont requis");
            return;
        }

        try {
            const response = await fetch("https://tvshowdbapi.herokuapp.com/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Mauvais username ou mot de passe");
            }

            const data = await response.json();
            setAuthToken(data.token);

            sessionStorage.setItem("authToken", data.token);

            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <div className="section">
                <div className="content">
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="username"
                                placeholder="e2254323"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="password"
                                placeholder="*******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        {error && <p className="help is-danger">{error}</p>}
                        <div className="control">
                            <button className="button is-success" onClick={handleLogin}>Connexion</button>
                            <button className="button is-danger" onClick={handleCancel}>Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
