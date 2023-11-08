export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
    <h1>{movie.title}</h1>
    <p>Director: {movie.director}</p>
    <img src={movie.image} alt={movie.title} className="movie-image" />
    <button onClick={onBackClick}>Back</button>
</div>
  );
};
