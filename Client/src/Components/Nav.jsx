import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Nav = ({ onSearch, randomize, logout }) => {
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <button onClick={randomize}>Add Random</button>
      <Link to='/about'>
        <button>About</button>
      </Link>
      <Link to='/home'>
        <button>Home</button>
      </Link>
      <Link to='/favorites'>
        <button>Favorites</button>
      </Link>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Nav;
