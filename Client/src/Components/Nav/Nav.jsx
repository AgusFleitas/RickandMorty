import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchById, setCharacters } from "../../redux/actions/actions";
import { useEffect, useState } from "react";

import { logout, search } from "../../Helpers/ModalObjects";

import SearchBar from "../SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import Notification from "../Notification/Notification";

import style from "./Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const regEx = /^[1-9]\d{0,2}$|^826$/;

  const allCharacters = useSelector((state) => state.allCharacters);

  // Estado para saber el nombre del usuario en caso de que haya logueado.
  const [username, setUserName] = useState(null);

  // Estado para saber si cargamos personajes del LocalStorage.
  const [initialLoad, setInitialLoad] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

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
    if (!storedCharacters && initialLoad) {
      setInitialLoad(false);
    } else if (storedCharacters) {
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
    if (!regEx.test(id)) {
      setShowNotification(true)
      return;
    }

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

  if(showModal) {
    console.log(document.body)
    document.body.classList.add('activeModal')
  } else {
    document.body.classList.remove('activeModal')
  }

  if(showNotification) {
    console.log(document.body)
    document.body.classList.add('activeNotif')
  } else {
    document.body.classList.remove('activeNotif')
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
        disabled={location.pathname !== "/home"}
      >
        Add Random Char
      </button>
      {username ? (
        <div className={style.session}>
          <span className={style.welcome}>Hi, {username}!</span>
          <button className={style.logOut} onClick={() => {setShowModal(true)}}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={style.guest}>
          <button className={style.logOut} onClick={() => navigate("/")}>
            Go to Login
          </button>
        </div>
      )}
      {showModal && (
        <Modal
          title={logout.title}
          message={logout.message}
          actionName={logout.actionName}
          actionFunc={logoutHandler}
          cancelFunc={() => {setShowModal(false)}}
        />
      )}
      {showNotification && (
        <Notification
          title={search.title}
          message={search.message}
          actionName={search.actionName}
          cancelFunc={() => {setShowNotification(false)}}
        />
      )}
    </div>
  );
};

export default Nav;
