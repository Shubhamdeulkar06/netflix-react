import BG from "../assets/bgc.jpg";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="w-full relative z-10">
      <div className=" fixed -z-10">
        <img src={BG} alt="background " />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
