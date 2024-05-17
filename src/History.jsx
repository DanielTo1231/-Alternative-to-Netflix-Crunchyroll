import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "./HistoryContext";

export const History = () => {
    const { history } = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const episodesPerPage = 6;

    const indexOfLastEpisode = currentPage * episodesPerPage;
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
    const currentEpisodes = history.slice(indexOfFirstEpisode, indexOfLastEpisode);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h1 className="title has-text-centered">History</h1>
            <div className="columns is-multiline">
                {currentEpisodes.map(episode => (
                    <div key={episode.episodeId} className="column is-one-third-tablet is-half-mobile">
                        <div>
                            <div className="card">
                                <div className="card-image">
                                    <Link to={`/episode/${episode.episodeId}`}>
                                        <figure className="image is-4by3">
                                            <img src={episode.imgURL} alt={episode.episodeTitle} />
                                        </figure>
                                    </Link>
                                </div>
                                <div className="card-content has-text-centered">
                                    <p className="title is-5">{episode.episodeTitle}</p>
                                    <p className="subtitle is-6">{episode.episodeNumber}</p>
                                    <div>
                                        <Link to={`/season/${episode.seasonId}`}>Saison {episode.seasonNumber}</Link> |
                                        <Link to={`/detail/${episode.tvshowId}`}> {episode.tvshowTitle}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <nav className="pagination is-left" role="navigation" aria-label="pagination">
                <a className="pagination-previous" onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}>
                    &lt;
                </a>
                <a className="pagination-next" onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(history.length / episodesPerPage)}>
                    &gt;
                </a>
                <ul className="pagination-list">
                    {Array.from({ length: Math.ceil(history.length / episodesPerPage) }, (_, i) => i + 1).map(pageNumber => (
                        <li key={pageNumber}>
                            <a className={`pagination-link ${pageNumber === currentPage ? "is-current" : ""}`}
                                onClick={() => paginate(pageNumber)}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={pageNumber === currentPage ? "page" : null}>
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
