import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import SearchBar from "../SearchBar/SearchBar";
import { searchById } from "../../redux/actions/actions";

import style from "./Nav.module.css";

const Nav = () => {

  const dispatch = useDispatch();

  // Add a character by ID on the SearchBar.
  async function searchHandler(id) {
        dispatch(searchById(id))
  }

  // Add a random character pressing the Random button.
  // function randomHandler() {
  //   let randomId = (Math.random() * 826).toFixed();

  //   randomId = parseInt(randomId);

  //   if (!characters.includes(randomId)) {
  //     searchHandler(randomId);
  //   } else {
  //     alert("Ese personaje ya fue agregado");
  //     return;
  //   }
  // }

  // Logout session.
  // function logoutHandler() {
  //   setAccess(false);
  // }

  return (
    <div className={style.navBar}>
      <div className={style.interno}>
        <SearchBar onSearch={searchHandler} />
        <button>Add Random</button>
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
