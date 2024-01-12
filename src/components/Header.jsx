import LOGO from "../assets/Netflix_Logo.png";
import USER_AVATAR from "../assets/Netflix-userIcon.jpeg";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSlice";
import { supportedLanguage } from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gptSearch.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);

  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when component will unmount
    return () => unsubscribe();
  }, []);

  const handleGptsearch = () => {
    dispatch(toggleGptSearch());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="w-full bg-gradient-to-b from-black  py-2 brightness-150 m-0 flex justify-between items-center relative z-50">
      <img className="w-24 pt-3 ml-[2%] md:w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex gap-2 items-center">
          {showGptSearch && (
            <div>
              <select
                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                onChange={handleLanguageChange}
                value={langKey}
              >
                {supportedLanguage.map((language) => (
                  <option key={language.identifier} value={language.identifier}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <button
              className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
              onClick={handleGptsearch}
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-red-900 opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24  bg-red-900 opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                {showGptSearch ? "Home" : "GPT Search"}
              </span>
              <span className="absolute inset-0 border-2 border-red-900 rounded-full"></span>
            </button>
          </div>
          <div className="flex flex-col items-center mx-4 text-white">
            <img
              className="w-7 md:w-10 rounded-md "
              src={USER_AVATAR}
              alt="user icon"
            />
            <button className="text-sm" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
