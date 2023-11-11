import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

        useEffect(() => {
            //fetching movies from heroku api
            fetch("https://movies-by-francisco97-7cb1503aab2b.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                //updating movies with fetched data
                setMovies(data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

        if (selectedMovie) {
            return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
          }
        
          if (movies.length === 0) {
            return <div>The list is empty!</div>;
          }
        
    return (
        <div>
            {movies && movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(movie) => {
                    setSelectedMovie(movie);
                    }}
                />
            ))}
        </div>
    );
};

//MainView PropTypes defined
MainView.propTypes = {
    movies: PropTypes.array.isRequired,
    selectedMovie: PropTypes.object,
    setSelectedMovie: PropTypes.func.isRequired,
};