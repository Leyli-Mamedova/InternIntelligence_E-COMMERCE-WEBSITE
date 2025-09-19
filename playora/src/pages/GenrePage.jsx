import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import { Dropdown } from 'react-bootstrap';
import { useRef } from 'react';

const GenrePage = () => {
    const { genreName } = useParams();
    const location = useLocation();
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [artistsInGenre, setArtistsInGenre] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState(null);
    const [loading, setLoading] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q")?.toLowerCase() || "";
    const albumsRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const [albumsRes, artistsRes, genresRes] = await Promise.all([
                axios.get("http://localhost:3003/albums"),
                axios.get("http://localhost:3003/artists"),
                axios.get("http://localhost:3003/genres")
            ]);
            setAlbums(albumsRes.data);
            setArtists(artistsRes.data);
            setGenres(genresRes.data);
            return
        } catch (error) {
            console.error("Error when receiving data:", error);
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setSelectedArtists([]);
    }, [genreName, searchQuery]);

    useEffect(() => {
        if (albums.length > 0 && artists.length > 0 && genres.length > 0) {
            let finalAlbums = [];

            if (genreName.toLowerCase() === "all") {
                finalAlbums = albums;
                setArtistsInGenre(artists);
            } else {
                const genre = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
                const genreId = genre ? genre.id : null;

                const artistsForGenre = artists.filter(artist => {
                    if (Array.isArray(artist.genreIds)) {
                        return artist.genreIds.map(String).includes(String(genreId));
                    }
                    // return String(artist.genreId) === String(genreId);
                });
                setArtistsInGenre(artistsForGenre);

                finalAlbums = albums.filter(album => {
                    if (Array.isArray(album.genreIds)) {
                        return album.genreIds.map(String).includes(String(genreId));
                    }
                    return String(album.genreIds) === String(genreId);
                });
            }

            // фильтр по артисту
            if (selectedArtists.length > 0) {
                const selectedIds = selectedArtists.map(a => String(a.id));
                finalAlbums = finalAlbums.filter(album => selectedIds.includes(String(album.artistId)));
            }

            // фильтр по поиску
            const queryParams = new URLSearchParams(location.search);
            const searchQuery = queryParams.get("q")?.toLowerCase() || "";
            if (searchQuery) {
                finalAlbums = finalAlbums.filter(album => {
                    const artist = artists.find(a => a.id == album.artistId);
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
                // удалить артиста из массива
                return prev.filter(a => a.id !== artist.id);
            } else {
                // добавить артиста в массив
                return [...prev, artist];
            }
        });
    };

    const toggleSelectAllArtists = () => {
        if (selectedArtists.length === artistsInGenre.length) {
            // если все выбраны — снимаем выбор
            setSelectedArtists([]);
        } else {
            // выбираем всех
            setSelectedArtists([...artistsInGenre]);
        }
    };

    if (loading) {
        return (
            <div className="container-fluid px-2 px-md-5 py-3 genre-page" style={{ height: "100vh" }}>
            </div>
        );
    }
    return (
        <section className="container-fluid px-2 px-md-5 py-3 genre-page" id='genre-page'>
            <h4 className="mb-4 text-white">{genreName.toLowerCase() === "all" ? "Iconic CDs" : `Iconic "${genreName}" CDs`}</h4>
            <div className="row">
                <div className="col-12 col-md-3">
                    <Dropdown
                        className="w-100 mb-5 mb-md-0"
                        show={dropdownOpen}
                        onToggle={() => { }}
                    >
                        <Dropdown.Toggle
                            id="dropdown-basic"
                            className="w-100 bg-white text-black border-0"
                            onClick={(e) => {
                                e.preventDefault();
                                setDropdownOpen(!dropdownOpen);
                            }}
                        >
                            <span className="fw-bold">Artists</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100 scrollable-dropdown-menu">
                            {/* "All Artists" — сброс фильтра */}
                            <Dropdown.Item
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSelectAllArtists();
                                    setDropdownOpen(true); // оставляем меню открытым
                                }}
                                className="drop-down-artists"
                            >
                                <label className="d-flex align-items-center mb-0">
                                    <input
                                        type="checkbox"
                                        checked={selectedArtists.length === artistsInGenre.length && artistsInGenre.length > 0}
                                        readOnly
                                        className="me-2"
                                    />
                                    All Artists
                                </label>
                            </Dropdown.Item>

                            {/* Мультивыбор артистов */}
                            {artistsInGenre.map((artist) => (
                                <Dropdown.Item key={artist.id} className="drop-down-artists">
                                    <label
                                        className="d-flex align-items-center mb-0"
                                        onClick={() => toggleArtistSelection(artist)} // кликаем по всей строке
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedArtists.some(a => a.id === artist.id)}
                                            readOnly // важен readOnly, чтобы React не ругался
                                            className="me-2"
                                        />
                                        {artist.name}
                                    </label>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="right col-12 col-md-9">
                    {filteredAlbums.length === 0 ? (
                        <div className="w-50 m-auto mb-g-5">
                            <p className="text-white fs-2 d-flex align-items-center" style={{ height: '40vh' }}>Nothing found</p>
                        </div>
                    ) : (
                        <div className="row gy-4">
                            {filteredAlbums.map(album => (
                                <Card key={album.id} data={album} artists={artists} refetch={fetchData} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GenrePage;