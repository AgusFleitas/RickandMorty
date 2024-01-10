import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchById, setCharacters } from "../../redux/actions/actions";
import { useEffect, useState } from "react";

import { logout, search, exist, login } from "../../Helpers/ModalObjects";

import SearchBar from "../SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import Notification from "../Notification/Notification";

import style from "./Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const allCharacters = useSelector((state) => state.allCharacters);

  // RegEx que utiliza la SearchBar.
  const regEx = /^(?:[1-9]|[1-9][0-9]|[1-7][0-9]{2}|8[0-1][0-9]|82[0-6])$/;
  
  // Estado para saber el nombre del usuario en caso de que haya logueado.
  const [username, setUserName] = useState(null);

  // Estado para saber si cargamos personajes del LocalStorage.
  const [initialLoad, setInitialLoad] = useState(true);

  // Estado para mostrar/ocultar el modal de LogOut.
  const [showModal, setShowModal] = useState(false);

  // Estado para mostrar/ocultar la notificación de la SearchBar.
  const [showNotification, setShowNotification] = useState(false);

  // Estado para mostrar/ocultar la notificación de un personaje existente.
  const [showNotifExist, setShowNotifExist] = useState(false);

  // Estado para mostrar/ocultar la notificación para Favoritos.
  const [showLogIn, setShowLogIn] = useState(false);

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
      setShowNotifExist(true)
    } else {
      dispatch(searchById(id));
    }
  }

  // Función que verifica una sesión para ir a Favorites.
  const handleFavoritesClick = (event) => {
    const userFromStorage = localStorage.getItem("user");

    if (!userFromStorage) {

      event.preventDefault();
      setShowLogIn(true);
    }
  };

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
        setShowNotifExist(true)
        return;
      } else {
        existingChar = false;
      }
    }

    if (!existingChar) {
      searchHandler(randomId);
    }
  }

  // Función para eliminar todos los personajes del Home.
  function deleteAllHome () {
    dispatch(setCharacters([]));
  }

  // Cerrar sesión.
  function logoutHandler() {
    localStorage.removeItem("user");
    localStorage.removeItem("allCharacters");
    navigate("/");
  }

  // Condicional para añadir una clase al body y deshabilitar momentaneamente la scrollbar.
  if(showModal || showNotification || showNotifExist) {
    document.body.classList.add('activeModal')
  } else {
    document.body.classList.remove('activeModal')
  }

  return (
    <div className={style.interno}>
      <div className={style.navLinks}>
        <Link to='/home' title="Go to Home.">Home</Link>
        <Link to='/favorites' title="Click to see your Favorite Characters." onClick={handleFavoritesClick}>Favorites</Link>
        <Link to='/about' title="Read more info about the autor of the website.">About</Link>
      </div>
      <SearchBar onSearch={searchHandler} />
      <div className={style.buttons}>
      <button
        onClick={randomHandler}
        className={style.random}
        title='Press to add a random character.'
        disabled={location.pathname !== "/home"}
      >
        Add Random Char
      </button>
      <button
      className={style.random}
      disabled={location.pathname !== "/home"}
      onClick={deleteAllHome}
      title="Click to delete all the characters in your Home."
      >Delete All Char</button>
      </div>
      {username ? (
        <div className={style.session}>
          <span className={style.welcome}>Hi, {username}!</span>
          <button className={style.logOut} title="Log Out button." onClick={() => {setShowModal(true)}}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={style.guest}>
          <button className={style.logOut} title="Click to go Login." onClick={() => navigate("/")}>
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
      {showNotifExist && (
        <Notification
          title={exist.title}
          message={exist.message}
          actionName={exist.actionName}
          cancelFunc={() => {setShowNotifExist(false)}}
        />
      )}
      {showLogIn && (
        <Notification
          title={login.title}
          message={login.message}
          actionName={login.actionName}
          cancelFunc={() => {setShowLogIn(false)}}
        />
      )}
    </div>
  );
};

export default Nav;
