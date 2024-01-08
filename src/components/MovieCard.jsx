/* eslint-disable react/prop-types */
import { CDN_IMG_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-52 pr-4">
      <img src={CDN_IMG_URL + posterPath} alt="movie poster " />
    </div>
  );
};

export default MovieCard;
