import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../SearchBar/SearchBar";
import { searchById, setCharacters } from "../../redux/actions/actions";

import style from "./Nav.module.css";
import { useEffect, useState } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allCharacters = useSelector((state) => state.allCharacters);

  // Estado para saber el nombre del usuario en caso de que haya logueado.
  const [username, setUserName] = useState(null);

  // Estado para saber si cargamos personajes del LocalStorage.
  const [initialLoad, setInitialLoad] = useState(true);
  
  // useEffect para comprobar si hay una sesión y mostrar el saludo con el nombre.
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");

    if (userFromStorage) {
      const { name } = JSON.parse(userFromStorage);
      setUserName(name);
    }
  }, []);

  // useEffect para cargar los personajes en el LocalStorage.
  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem("allCharacters"));
    if (storedCharacters && initialLoad) {
      dispatch(setCharacters(storedCharacters));
      setInitialLoad(false);
    }
  }, [dispatch, initialLoad]);

  // useEffect para guardar los personajes en el localStorage.
  useEffect(() => {
    if (!initialLoad) {
      localStorage.setItem("allCharacters", JSON.stringify(allCharacters));
    }
  }, [allCharacters, initialLoad]);

  // Añadir un personaje por ID en la barra de búsqueda.
  async function searchHandler(id) {
    if (allCharacters.length === 0) {
      dispatch(searchById(id));
      return;
    }

    const numberID = parseInt(id);
    let exists = allCharacters.some((char) => char.id === numberID);

    if (exists) {
      alert(`Character with ID ${id} already exists!`);
    } else {
      dispatch(searchById(id));
    }
  }

  // Añadir un personaje random al presionar el botón.
  function randomHandler() {
    if (allCharacters.length === 0) {
      let randomId = Math.floor(Math.random() * 826) + 1;
      randomId = parseInt(randomId);

      searchHandler(randomId);
    }

    let randomId = (Math.random() * 826).toFixed();

    randomId = parseInt(randomId);

    let existingChar = true;

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

  // Cerrar sesión.
  function logoutHandler() {
    localStorage.removeItem("user");
    localStorage.removeItem("allCharacters");
    navigate("/");
  }

  return (
    <div className={style.interno}>
      <div className={style.navLinks}>
        <Link to='/home'>Home</Link>
        <Link to='/favorites'>Favorites</Link>
        <Link to='/about'>About</Link>
      </div>
      <SearchBar onSearch={searchHandler} />
      <button
        onClick={randomHandler}
        className={style.random}
        title='Press to add a random character.'
      >
        Add Random Char
      </button>
      {username ? 
      <div className={style.session}>
        <span className={style.welcome}>Hi, {username}!</span>
        <button className={style.logOut} onClick={logoutHandler}>
          Log Out
        </button>
      </div>
      : 
      <div className={style.guest}>
        <button className={style.logOut} onClick={() => navigate("/")}>Go to Login</button>
      </div>
      }
    </div>
  );
};

export default Nav;
