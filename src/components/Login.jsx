import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import BG from "../assets/bgc.jpg";
import USER_AVATAR from "../assets/Netflix-userIcon.jpeg";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);
    if (!isSignedIn) {
      const message = checkValidData(
        email.current.value,
        password.current.value,
        name.current.value
      );
      setErrorMessage(message);
      if (message) return;
      // logic for sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // ..
        });
      // console.log(name.current.value);
    } else {
      const message = checkValidData(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      // logic for sign in

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "----" + errorMessage);
          setErrorMessage("Please check your credentials properly");
        });
    }
  };

  useEffect(() => {
    // this function is used for changing background image based on responsiveness
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Add event listener to update isMobile on window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`w-full min-h-screen bg-cover  ${isMobile ? "bg-black" : " "}`}
      style={isMobile ? {} : { backgroundImage: `url(${BG})` }}
    >
      <Header />
      <div className="w-full md:max-w-[450px] pt-6 md:pt-0 px-[5%] mx-auto md:px-0 ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex text-white items-start flex-col  md:w-12/12 md:mx-auto  lg:w-12/12 bg-black md:bg-opacity-70 md:px-16 md:py-14 rounded-md  "
        >
          <h1 className="text-white text-3xl font-semibold mb-6 opacity-100">
            {isSignedIn ? "Sign In" : " Sign Up"}
          </h1>
          {!isSignedIn && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="px-5 py-4 my-2 w-full rounded-md bg-[#333333]"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className="px-5 py-4 my-2 w-full rounded-md bg-[#333333]"
          />
          <input
            ref={password}
            type="text"
            placeholder="Password"
            className="px-5 py-4 my-2 w-full rounded-md bg-[#333333]"
          />
          <button
            className="px-5 my-6 py-3 text-white font-bold rounded-md bg-red-600 w-full hover:bg-red-700 ease-in-out duration-200"
            onClick={handleButtonClick}
          >
            {isSignedIn ? "Sign In" : " Sign Up"}
          </button>
          <p className="text-red-500 font-bold text-lg py-3">{errorMessage}</p>
          <p className="my-3 cursor-pointer" onClick={toggleSignInForm}>
            {isSignedIn
              ? "New to Netflix? Sign up now."
              : "Already Registered? Sign in now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
