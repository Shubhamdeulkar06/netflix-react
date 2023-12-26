import LOGO from "../assets/Netflix_Logo.png";

const Header = () => {
  return (
    <div className=" bg-gradient-to-b from-black  md:py-2 brightness-150">
      <img className="w-24 pt-3 ml-[2%] md:w-44" src={LOGO} alt="logo" />
    </div>
  );
};

export default Header;
