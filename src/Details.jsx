import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function DetailPage() {
    const { id } = useParams();
    const [show, setShow] = useState(null);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await fetch(`https://tvshowdbapi.herokuapp.com/tvshow?tvshowId=${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching show details: ${response.status}`);
                }
                const data = await response.json();
                setShow(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchShowDetails();
    }, [id]);

    if (!show) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="columns">
                <div className="column is-one-quarter">
                    <img src={show.imgURL} alt={show.title}/>
                </div>
                <div className="column">
                    <h1 className="title">{show.title}</h1>
                    <p><b>Year:</b> {show.year}</p>
                    <p><b>Episode Count:</b> {show.episodeCount}</p>
                    <p><b>Parental Guideline:</b> {show.tvParentalGuideline}</p>
                    <p><b>Genres:</b> {show.genres.map(genre => genre.name).join(", ")}</p>
                    <p><b>Studio:</b> {show.studio.name}</p>
                    <p><b>Description:</b> {show.plot}</p>
                    <p>
                        <audio controls src={show.audioURL} autoPlay>
                            <source type="audio/ogg"/>
                            Your browser does not support the audio element.
                        </audio>
                    </p>
                </div>
            </div>
            <div className="columns" style={{overflow: "auto"}}>
                {show.roles.map(role => (
                    <div key={role.roleId} className="column is-one-fifth">
                        <img src={role.imgURL} alt={role.character}/>
                        <p><b>Character:</b> {role.character}</p>
                        <p><b>Name:</b> {role.name}</p>
                    </div>
                ))}
            </div>
            <div className="columns is-multiline">
                {show.seasons.map(season => (
                    <div key={season.seasonId} className="column is-one-fifth">
                        <img src={season.imgURL} alt={`Season ${season.number}`}/>
                        <p className="has-text-centered"><b>Season:</b> {season.number}</p>
                        <p className="has-text-centered"><b>Episode Count:</b> {season.episodeCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
