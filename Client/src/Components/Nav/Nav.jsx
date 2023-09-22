import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = ({ onSearch, randomize, logout }) => {
  return (
    <div className={style.navBar}>
      <div className={style.interno}>
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
    </div>
  );
};

export default Nav;
