import { useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="w-full mt-8 md:pt-0 px-[5%] mx-auto md:px-0 flex justify-center absolute">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid w-full md:w-1/2 grid-cols-12 text-white items-start  md:bg-opacity-70 md:px-16 md:py-14 rounded-md bg-black "
      >
        <input
          type="text"
          placeholder={lang[langKey].searchPlaceholder}
          className="px-5 py-4 my-2 mx-1 col-span-9 rounded-md bg-[#333333]"
        />

        <button className="px-5 my-2 py-4 mx-1 text-white font-bold rounded-md bg-red-600  col-span-3">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
