import React, { useState, useEffect } from "react";
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

    // Check for stored user and token
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        setUser(storedUser ? JSON.parse(storedUser) : null);
        setToken(storedToken ? storedToken : null);
    }, []);

    //Function to handle logout
    const handleLogout = () => {
        //Clear user and token from state
        setUser(null);
        setToken(null);

        // Clear user and token from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

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
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
