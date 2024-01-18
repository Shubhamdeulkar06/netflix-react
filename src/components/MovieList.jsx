/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies);

  return (
    <div className="px-0 md:px-6">
      <h1 className="text-lg md:text-3xl font-semibold py-3">{title}</h1>
      <div className="flex overflow-x-scroll your-container">
        <div className="flex ">
          {movies &&
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie?.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
