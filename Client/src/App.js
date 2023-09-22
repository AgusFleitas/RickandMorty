import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


import Cards from "./Components/Cards.jsx";
import Nav from "./Components/Nav/Nav.jsx";
  
import Favorites from "./Views/Favorites.jsx";
import About from "./Views/About.jsx";
import Detail from "./Views/Detail.jsx";
import Form from "./Views/Form.jsx";
import ErrorPage from "./Views/ErrorPage.jsx"

import style from "./App.module.css";


function App() {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  const [access, setAccess] = useState(false);

  async function loginHandler(userData) {
    const { email, password } = userData;
    const URL = "http://localhost:3001/rickandmorty/login/";
    const { data } = await axios(URL + `?email=${email}&password=${password}`);
    const { access } = data;
    setAccess(access);
    access && navigate("/home");
  }

  function logoutHandler() {
    setAccess(false);
    setCharacters([]);
  }

  // 

  useEffect(() => {
    !access && navigate("/");
    //eslint-disable-next-line
  }, [access]);

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
      console.log(error);
      alert(error.message);
    }
  } 

  // Delete character from Home.

  function closeHandler(id) {
    let filteredCharacters = characters.filter(
      (character) => character.id !== id
    );

    setCharacters(filteredCharacters);
  }

  // Add a random character.

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

  // Render ↓

  return (
    <div className={style.App}>
      {location.pathname !== "/" && (
        <Nav
          onSearch={searchHandler}
          randomize={randomHandler}
          logout={logoutHandler}
        />
      )}
      <Routes>
        <Route path='/' element={<Form login={loginHandler} />} />
        <Route
          path='/home'
          element={<Cards characters={characters} onClose={closeHandler} />}
        />

        <Route path='/favorites' element={<Favorites />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
