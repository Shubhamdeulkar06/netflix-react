import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies.trailer);
  useMovieTrailer(movieId);

  return (
    <div className="min-w-screen overflow-hidden">
      <iframe
        className="min-w-full aspect-video overflow-hidden"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
      ></iframe>
    </div>
  );
};

export default VideoBackground;
