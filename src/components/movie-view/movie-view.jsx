import PropTypes from 'prop-types';

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

//MovieView PropTypes defined
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // Include other movie properties as needed
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};