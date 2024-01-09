import LOGO from "../assets/Netflix_Logo.png";
import USER_AVATAR from "../assets/Netflix-userIcon.jpeg";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="w-full bg-gradient-to-b from-black  py-2 brightness-150 m-0 flex justify-between items-center relative z-50">
      <img className="w-24 pt-3 ml-[2%] md:w-44" src={LOGO} alt="logo" />
      {user && (
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
      )}
    </div>
  );
};

export default Header;
