import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
// import Footer from "./Footer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div className="">
      <Header />
      <MainContainer />
      <SecondaryContainer />
      <div className="p-2 bg-gray-600 w-full"></div>
    </div>
  );
};

export default Browse;
