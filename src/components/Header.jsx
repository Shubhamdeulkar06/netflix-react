import LOGO from "../assets/Netflix_Logo.png";
import USER_AVATAR from "../assets/Netflix-userIcon.jpeg";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSlice";
import { supportedLanguage } from "../utils/languageConstants";
import { changeLanguage, toggleUserDropdown } from "../utils/configSlice";

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
        isDropdownOpen && dispatch(toggleUserDropdown());
        showGptSearch && dispatch(toggleGptSearch());
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

  const isDropdownOpen = useSelector(
    (store) => store.config.toggleDropdownHeader
  );

  const toggleDropdown = () => {
    dispatch(toggleUserDropdown());
  };
  return (
    <div className="w-full bg-gradient-to-b from-black px-2 py-2 brightness-150 m-0 flex justify-between items-center relative z-50 md:px-10">
      <span className="ml-[2%] md:m-0">
        <Link to={"/"}>
          <img className="w-24 pt-3  md:w-44" src={LOGO} alt="logo" />
        </Link>
      </span>
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

          <div className="hidden md:block">
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
          <div className="relative md:w-44">
            <button
              id="dropdownAvatarNameButton"
              className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0  dark:text-white"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 me-2 rounded-md"
                src={USER_AVATAR}
                alt="user photo"
              />
              {user.displayName}
              <svg
                className={`w-2.5 h-2.5 ms-3 transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                id="dropdownAvatarName"
                className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900 dark:divide-gray-600 right-0"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium">Pro User</div>
                  <div className="truncate">{user.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200 block"
                  aria-labelledby="dropdownAvatarNameButton"
                >
                  <li className="block md:hidden">
                    <a
                      href="#"
                      onClick={handleGptsearch}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {showGptSearch ? "Home" : "GPT Search"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Search
                    </a>
                  </li>
                </ul>
                <div className="py-2">
                  <a
                    href="#"
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
