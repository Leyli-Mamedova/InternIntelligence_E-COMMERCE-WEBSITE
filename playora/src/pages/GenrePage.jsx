import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import { Dropdown } from 'react-bootstrap';

const GenrePage = () => {
    const { genreName } = useParams();
    const location = useLocation();
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [artistsInGenre, setArtistsInGenre] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]); // Исправлено: инициализация пустым массивом
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(true);

    // Путь к вашей базе данных относительно корня сайта на GitHub Pages
    const DB_URL = "/InternIntelligence_E-COMMERCE-WEBSITE/db.json";

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            // Получаем все данные одним запросом из статического файла
            const res = await axios.get(DB_URL);
            
            setAlbums(res.data.albums);
            setArtists(res.data.artists);
            setGenres(res.data.genres);
        } catch (error) {
            console.error("Error when receiving data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Сброс выбранных артистов при смене жанра или новом поиске
    useEffect(() => {
        setSelectedArtists([]);
    }, [genreName]);

    useEffect(() => {
        if (albums.length > 0 && artists.length > 0 && genres.length > 0) {
            let finalAlbums = [];
            let currentGenreId = null;

            // 1. Фильтрация по жанру
            if (genreName.toLowerCase() === "all") {
                finalAlbums = albums;
                setArtistsInGenre(artists);
            } else {
                const genre = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
                currentGenreId = genre ? genre.id : null;

                const artistsForGenre = artists.filter(artist => 
                    Array.isArray(artist.genreIds) 
                        ? artist.genreIds.map(String).includes(String(currentGenreId))
                        : String(artist.genreId) === String(currentGenreId)
                );
                setArtistsInGenre(artistsForGenre);

                finalAlbums = albums.filter(album => 
                    Array.isArray(album.genreIds)
                        ? album.genreIds.map(String).includes(String(currentGenreId))
                        : String(album.genreIds) === String(currentGenreId)
                );
            }

            // 2. Фильтр по выбранным артистам (мультивыбор)
            if (selectedArtists.length > 0) {
                const selectedIds = selectedArtists.map(a => String(a.id));
                finalAlbums = finalAlbums.filter(album => selectedIds.includes(String(album.artistId)));
            }

            // 3. Фильтр по поисковому запросу из URL
            const queryParams = new URLSearchParams(location.search);
            const searchQuery = queryParams.get("q")?.toLowerCase() || "";
            
            if (searchQuery) {
                finalAlbums = finalAlbums.filter(album => {
                    const artist = artists.find(a => String(a.id) === String(album.artistId));
                    const tracklistMatches = album.tracklist?.some(track =>
                        track.toLowerCase().includes(searchQuery)
                    );
                    return (
                        album.title.toLowerCase().includes(searchQuery) ||
                        album.desc.toLowerCase().includes(searchQuery) ||
                        artist?.name?.toLowerCase().includes(searchQuery) ||
                        tracklistMatches
                    );
                });
            }

            setFilteredAlbums(finalAlbums);
        }
    }, [genreName, albums, artists, genres, selectedArtists, location.search]);

    const toggleArtistSelection = (artist) => {
        setSelectedArtists(prev => {
            if (prev.some(a => a.id === artist.id)) {
                return prev.filter(a => a.id !== artist.id);
            } else {
                return [...prev, artist];
            }
        });
    };

    const toggleSelectAllArtists = () => {
        if (selectedArtists.length === artistsInGenre.length) {
            setSelectedArtists([]);
        } else {
            setSelectedArtists([...artistsInGenre]);
        }
    };

    if (loading) {
        return <div className="container-fluid px-2 px-md-5 py-3 genre-page" style={{ height: "100vh" }}></div>;
    }

    return (
        <section className="container-fluid px-2 px-md-5 py-3 genre-page" id='genre-page'>
            <h4 className="mb-4 text-white">
                {genreName.toLowerCase() === "all" ? "Iconic CDs" : `Iconic "${genreName}" CDs`}
            </h4>
            
            <div className="row">
                {/* Левая колонка: Фильтры */}
                <div className="col-12 col-md-3">
                    <Dropdown 
                        className="w-100 mb-5 mb-md-0" 
                        show={dropdownOpen} 
                        onToggle={() => {}}
                    >
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            className="w-100 bg-white text-black border-0 d-flex justify-content-between align-items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                setDropdownOpen(!dropdownOpen);
                            }}
                        >
                            <span className="fw-bold">Artists</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100 scrollable-dropdown-menu shadow">
                            <Dropdown.Item
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSelectAllArtists();
                                }}
                                className="drop-down-artists"
                            >
                                <label className="d-flex align-items-center mb-0 w-100" style={{ cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedArtists.length === artistsInGenre.length && artistsInGenre.length > 0}
                                        onChange={() => {}} // Управляется через onClick родителя
                                        className="me-2"
                                    />
                                    All Artists
                                </label>
                            </Dropdown.Item>

                            {artistsInGenre.map((artist) => (
                                <Dropdown.Item 
                                    key={artist.id} 
                                    className="drop-down-artists"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleArtistSelection(artist);
                                    }}
                                >
                                    <label className="d-flex align-items-center mb-0 w-100" style={{ cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedArtists.some(a => a.id === artist.id)}
                                            onChange={() => {}}
                                            className="me-2"
                                        />
                                        {artist.name}
                                    </label>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Правая колонка: Список альбомов */}
                <div className="right col-12 col-md-9">
                    {filteredAlbums.length === 0 ? (
                        <div className="text-center w-100 py-5">
                            <p className="text-white fs-2">Nothing found</p>
                        </div>
                    ) : (
                        <div className="row gy-4">
                            {filteredAlbums.map(album => (
                                <Card 
                                    key={album.id} 
                                    data={album} 
                                    artists={artists} 
                                    refetch={fetchData} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GenrePage;