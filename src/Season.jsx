import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "./HistoryContext.jsx";
import "./styles.css";

export const SeasonPage = () => {
    const { history } = useHistory();
    const { seasonId } = useParams();
    const [season, setSeason] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const episodesPerPage = 8;

    useEffect(() => {
        const fetchSeason = async () => {
            try {
                const response = await fetch(`https://tvshowdbapi.herokuapp.com/episodes?seasonId=${seasonId}`);
                const data = await response.json();
                setSeason(data);
            } catch (error) {
                console.error("Error fetching season details:", error);
            }
        };

        fetchSeason();
    }, [seasonId]);

    if (!season) {
        return <div>Loading...</div>;
    }

    const indexOfLastEpisode = currentPage * episodesPerPage;
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
    const currentEpisodes = season.episodes.slice(indexOfFirstEpisode, indexOfFirstEpisode + episodesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="section">
                <h1 className="title has-text-centered">{season.tvshowTitle}</h1>
                <h2 className="title has-text-centered">{season.seasonNumber}</h2>
            </div>
            <div className="columns is-multiline">
                {currentEpisodes.map(episode => {
                    const isWatched = history.some(historyItem => historyItem.episodeId === episode.episodeId);
                    return (
                        <div key={episode.episodeId} className={`column is-one-quarter-desktop is-one-third-tablet is-half-mobile ${isWatched ? "greyed-out" : ""}`}>
                            <div className="card">
                                <Link to={`/episode/${episode.episodeId}`}>
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src={episode.imgURL} alt={episode.title} />
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <p className="title is-5 has-text-centered">{episode.title}</p>
                                        <p className="subtitle is-6 has-text-centered">{episode.number}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
            <nav className="pagination" role="navigation" aria-label="pagination">
                <a className="pagination-previous" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </a>
                <a className="pagination-next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(season.episodes.length / episodesPerPage)}>
                    &gt;
                </a>
                <ul className="pagination-list">
                    {Array.from({ length: Math.ceil(season.episodes.length / episodesPerPage) }, (_, i) => i + 1).map(pageNumber => (
                        <li key={pageNumber}>
                            <button className={`pagination-link ${pageNumber === currentPage ? "is-current" : ""}`}
                                onClick={() => paginate(pageNumber)}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={pageNumber === currentPage ? "page" : null}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
