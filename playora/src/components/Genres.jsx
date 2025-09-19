import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Genres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get("http://localhost:3003/genres");
                setGenres(response.data);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <section className="container-fluid py-5 trends px-4">
            <h1 className="text-center fw-bold text-black mb-5 pt-4">Categories</h1>
            <div className="row g-4 justify-content-center pb-5">
                {genres.map(genre => (
                    <div className="col-6 col-md-4 categories-genres" key={genre.id} style={{width: '250px'}}>
                        <Link to={`/genre/${genre.name}`} className="text-decoration-none">
                            <div className="card text-center border-0 shadow-sm category-card">
                                <div className="card-body mb-0 py-1 py-md-3 text-center">
                                    <h5 className="card-title text-black mb-0 py-1">{genre.name}</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Genres;