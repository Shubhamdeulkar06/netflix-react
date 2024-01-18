/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies.trailer);
  useMovieTrailer(movieId);

  return (
    <div className="min-w-full ">
      <iframe
        className="min-w-full aspect-video mt-0 md:-mt-32"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&rel=0&modestbranding=1&controls=0&&showinfo=0&loop=1"
        }
      ></iframe>
    </div>
  );
};

export default VideoBackground;
