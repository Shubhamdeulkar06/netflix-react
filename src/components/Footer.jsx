const Footer = () => {
  return (
    <footer className="bg-black w-full">
      <div className="py-16 px-6 md:px-24">
        <div className="text-gray-300">Questions? Call 000-800-919-1694</div>
        <ul className="text-gray-300 my-4 grid grid-cols-2 grid-rows-8 lg:grid-cols-4 lg:grid-rows-4 gap-1">
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Help Centre</a>
          </li>
          <li>
            <a href="#">Account</a>
          </li>
          <li>
            <a href="#">Media Centre</a>
          </li>
          <li>
            <a href="#">Investor Relations</a>
          </li>
          <li>
            <a href="#">Ways to Watch</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Cookie Preferences</a>
          </li>
          <li>
            <a href="#">Corporate Information</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Speed Test</a>
          </li>
          <li>
            <a href="#">Legal Notices</a>
          </li>
          <li>
            <a href="#">Only on Netflix</a>
          </li>
        </ul>
        <div>
          🚀
          <select>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <div className="text-gray-300 my-2">Netflix India</div>
      </div>
    </footer>
  );
};

export default Footer;
