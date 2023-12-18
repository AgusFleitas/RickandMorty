import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SearchBar from "../SearchBar/SearchBar";

import style from "./Nav.module.css";

const Nav = ({ onSearch, randomize, logout }) => {

  const [characters, setCharacters] = useState([]);

  // Add a character by ID on the SearchBar.
  async function searchHandler(id) {
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );

      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        throw new Error("¡No hay personajes con este ID!");
      }
    } catch (error) {
      alert(error);
    }
  }

  // Add a random character pressing the Random button.
  function randomHandler() {
    let randomId = (Math.random() * 826).toFixed();

    randomId = parseInt(randomId);

    if (!characters.includes(randomId)) {
      searchHandler(randomId);
    } else {
      alert("Ese personaje ya fue agregado");
      return;
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
