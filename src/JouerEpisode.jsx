import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "./Auth";

export const JouerEpisode = () => {
    const { episodeId } = useParams();
    const [episode, setEpisode] = useState(null);
    const [error, setError] = useState("");
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                if (!authToken) {
                    setError("Vous devez vous connecter pour accéder aux vidéos.");
                    return;
                }

                const response = await fetch(`https://tvshowdbapi.herokuapp.com/viewepisode?episodeId=${episodeId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération de l'épisode");
                }

                const data = await response.json();
                setEpisode(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchEpisode();
    }, [episodeId, authToken]);

    if (error) {
        return (
            <div className="container">
                <div className="notification is-danger">
                    {error} <Link to="/login">Connexion</Link>
                </div>
            </div>
        );
    }

    if (!episode) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="section">
                <video controls width="100%">
                    <source src={episode.videoURL} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            </div>
        </div>
    );
};
