import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Star Wars: Episode III",
            image:
              "https://dyn1.heritagestatic.com/lf?set=path%5B1%2F3%2F5%2F2%2F2%2F13522913%5D&call=url%5Bfile%3Aproduct.chain%5D",
            director: "George Lucas"
          },
          {
            id: 2,
            title: "Se7en",
            image:
              "https://m.media-amazon.com/images/I/81A--37cLmL._AC_UF894,1000_QL80_.jpg",
            director: "David Fincher"
          },
          {
            id: 3,
            title: "Kill Bill",
            image:
              "https://m.media-amazon.com/images/I/81Az82YYZaS.jpg",
            director: "Quentin Tarantino"
          },
          {
            id: 4,
            title: "The Big Short",
            image:
              "https://m.media-amazon.com/images/I/91dC4o8mScL._AC_UF894,1000_QL80_.jpg",
            director: "Adam McKay"
          },
          {
            id: 5,
            title: "Once Upon a Time... in Hollywood",
            image:
              "https://m.media-amazon.com/images/I/A1t6lwCERdL.jpg",
            director: "Quentin Tarantino"
          }
        ]);

        const [selectedMovie, setSelectedMovie] = useState(null);

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
        </div>
    );
}