import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

        useEffect(() => {
             if (!token) {
                return;
              }
                //fetching movies from heroku api
            fetch("https://movies-by-francisco97-7cb1503aab2b.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((data) => {
                    //updating movies with fetched data
                    console.log(data);
                    setMovies(data);
                })
                .catch((error) => {
                    console.error("Error fetching movies:", error);
                });
        }, [token]);

    if (!user) {
        return (
                <>
                    <LoginView 
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }} 
                    />
                    or
                    <SignupView />
                </>
            );
    }

        if (selectedMovie) {
            return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
          }
        
          if (movies.length === 0) {
            return <div>The list is empty!</div>;
          }
        
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(movie) => {
                    setSelectedMovie(movie);
                    }}
                />
            ))}
            <button onClick={() => { 
                setUser(null);
                setToken(null);
            }}>Logout</button>
        </div>
    );
};

//MainView PropTypes defined
MainView.propTypes = {
    movies: PropTypes.array.isRequired,
    selectedMovie: PropTypes.object,
    setSelectedMovie: PropTypes.func.isRequired,
};