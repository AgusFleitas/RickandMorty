import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../SearchBar/SearchBar";
import { searchById } from "../../redux/actions/actions";

import style from "./Nav.module.css";

const Nav = () => {
  const allCharacters = useSelector((state) => state.allCharacters);
  const dispatch = useDispatch();

  // Add a character by ID on the SearchBar.
  async function searchHandler(id) {
    dispatch(searchById(id));
  }

  // Add a random character pressing the Random button.
  function randomHandler() {

    if (allCharacters.length === 0) {
      let randomId = (Math.random() * 826).toFixed();
      randomId = parseInt(randomId);

      searchHandler(randomId);
    }

    let randomId = (Math.random() * 826).toFixed();

    randomId = parseInt(randomId);

    let existingChar = true

    for (let char of allCharacters) {
      if (char.id === randomId) {
        alert(`Character with ID ${randomId} already exists!`);
        return;
      } else {
        existingChar = false;
      }
    }

    if (!existingChar) {
      searchHandler(randomId);
    }
  }

  // Logout session.
  // function logoutHandler() {
  //   setAccess(false);
  // }

  return (
    <div className={style.navBar}>
      <div className={style.interno}>
        <SearchBar onSearch={searchHandler} />
        <button onClick={randomHandler}>Add Random</button>
        <Link to='/about'>
          <button>About</button>
        </Link>
        <Link to='/home'>
          <button>Home</button>
        </Link>
        <Link to='/favorites'>
          <button>Favorites</button>
        </Link>
        <button>Log Out</button>
      </div>
    </div>
  );
};

export default Nav;
