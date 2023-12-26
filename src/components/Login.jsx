import { useState, useEffect } from "react";
import Header from "./Header";
import BG from "../assets/login-bgc.jpg";

const Login = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
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
      className={`w-full h-screen bg-opacity-95 bg-cover ${
        isMobile ? "bg-black" : "bg-black brightness-75"
      }`}
      style={isMobile ? {} : { backgroundImage: `url(${BG})` }}
    >
      <Header />
      <div className="w-full md:max-w-[450px] pt-6 md:pt-0 px-[5%] mx-auto lg:px-0  ">
        <form
          action=""
          className="flex text-white items-start flex-col  md:w-12/12 md:mx-auto  lg:w-12/12 bg-black md:bg-opacity-70 md:px-16 md:py-14 "
        >
          <h1 className="text-white text-3xl font-semibold mb-6 opacity-100">
            Sign In
          </h1>
          <input
            type="text"
            placeholder="Email or phone number"
            className="px-5 py-4 my-2 w-full rounded-md bg-[#333333]"
          />
          <input
            type="text"
            placeholder="Password"
            className="px-5 py-4 my-2 w-full rounded-md bg-[#333333]"
          />
          <button className="px-5 mt-6 py-3 text-white font-bold rounded-md bg-red-600 w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
