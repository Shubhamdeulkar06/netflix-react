import { useDispatch, useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  // serach movie in tmdb database
  const serachMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query " +
      searchText.current.value +
      ". only give me the names of five movies, comma separated like the example result given ahead. Example Result: Don, Raone, Paa, Roohi, Dhamaal";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    // error handling
    if (!gptResults.choices) {
      console.log("No results found");
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => serachMovieTmdb(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="w-full  md:pt-8 px-[5%] mx-auto md:px-0 flex justify-center ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid w-full md:w-1/2 grid-cols-12 text-white items-start  md:bg-opacity-70 md:px-16 md:py-14 rounded-md bg-black "
      >
        <input
          type="text"
          placeholder={lang[langKey].searchPlaceholder}
          className="px-5 py-4 my-2 mx-1 col-span-9 rounded-md bg-[#333333]"
          ref={searchText}
        />

        <button
          className="px-5 my-2 py-4 mx-1 text-white font-bold rounded-md bg-red-600  col-span-3 hover:bg-red-700 ease-in-out duration-200"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
