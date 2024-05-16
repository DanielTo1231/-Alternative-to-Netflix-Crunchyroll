import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Home() {
    const [tvShows, setTvShows] = useState([]);
    const [studios, setStudios] = useState([]);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterStudio, setFilterStudio] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage, setShowsPerPage] = useState(8);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseShows = await fetch("https://tvshowdbapi.herokuapp.com/tvshows");
                const showsData = await responseShows.json();
                setTvShows(showsData);

                const responseStudios = await fetch("https://tvshowdbapi.herokuapp.com/studios");
                const studiosData = await responseStudios.json();
                setStudios(studiosData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = tvShows.slice(indexOfFirstShow, indexOfLastShow);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const changeShowsPerPage = (e) => {
        setShowsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to page 1 when changing shows per page
    };

    const filterTvShows = () => {
        return currentShows.filter(show => {
            const titleMatch = show.title.toLowerCase().includes(filterTitle.toLowerCase());
            const studioMatch = filterStudio === "" || show.studio.name.toLowerCase() === filterStudio.toLowerCase();
            return titleMatch && studioMatch;
        });
    };

    return (
        <div className="container">
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label htmlFor="title" className="label">Title</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded">
                            <input id="title" className="input" type="text" placeholder="Titre de la série"
                                value={filterTitle} onChange={e => setFilterTitle(e.target.value)}/>
                        </p>
                    </div>
                </div>
                <div className="field-label is-normal">
                    <label htmlFor="studios" className="label">Studio</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select">
                                <select id="studios" value={filterStudio}
                                    onChange={e => setFilterStudio(e.target.value)}>
                                    <option value="">Tous les Studios</option>
                                    {studios.map(studio => (
                                        <option key={studio.studioId} value={studio.name}>{studio.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns is-multiline">
                {filterTvShows().map(show => (
                    <div key={show.tvshowId} className="column is-12-mobile is-6-tablet is-3-desktop">
                        <Link to={`/detail/${show.tvshowId}`}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-square">
                                        <img src={show.imgURL} alt={show.title}/>
                                    </figure>
                                </div>
                                <div className="card-content has-text-centered">
                                    <p className="title is-4">{show.title}</p><br/>
                                    <p className="subtitle is-6 mb-0"><b>Studio: </b>{show.studio.name}</p>
                                    <p className="subtitle is-6">
                                        <b>Genres: </b>{show.genres.map(genre => genre.name).join(", ")}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <nav className="pagination is-left" role="navigation" aria-label="pagination">
                <a className="pagination-previous" onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}>
                    &lt;
                </a>
                <a className="pagination-next" onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(tvShows.length / showsPerPage)}>
                    &gt;
                </a>
                <ul className="pagination-list">
                    {Array.from({length: Math.ceil(tvShows.length / showsPerPage)}, (_, i) => i + 1).map(pageNumber => (
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
            <div className="field has-text-centered">
                <div className="control">
                    <div className="select">
                        <select value={showsPerPage} onChange={changeShowsPerPage}>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
