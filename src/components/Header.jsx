import LOGO from "../assets/Netflix_Logo.png";
// import Netflix_User_ICON from "../assets/Netflix-userIcon.jpeg";
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
    <div className="w-full bg-gradient-to-b from-black  py-2 brightness-150 m-0 flex justify-between items-center">
      <img className="w-24 pt-3 ml-[2%] md:w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex mx-2 text-white">
          <img
            className="w-10 rounded-full "
            src={user?.photoURL}
            alt="user icon"
          />
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
