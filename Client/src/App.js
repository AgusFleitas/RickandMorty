import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Cards from "./Components/Cards.jsx";
import Nav from "./Components/Nav.jsx";
import Favorites from "./Components/Favorites.jsx";

import About from "./Views/About.jsx";
import Detail from "./Views/Detail.jsx";
import Form from "./Views/Form.jsx";

import "./App.css";

function App() {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  const [access, setAccess] = useState(false);
  const EMAIL = "agusfleitas@gmail.com";
  const PASSWORD = "123456abc";

  function loginHandler(userData) {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
      navigate("/home");
    }
  }

  function logoutHandler() {
    setAccess(false);
  }

  useEffect(() => {
    !access && navigate("/");
    //eslint-disable-next-line
  }, [access]);

  function searchHandler(id) {
    if (!characters.some((character) => character.id === Number(id))) {
      axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      ).then(({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      });
    } else {
      alert("Este personaje ya fue agregado!");
      return;
    }
  }

  function closeHandler(id) {
    let filteredCharacters = characters.filter(
      (character) => character.id !== Number(id)
    );

    setCharacters(filteredCharacters);
  }

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

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav
          onSearch={searchHandler}
          randomize={randomHandler}
          logout={logoutHandler}
        />
      )}
      <Routes>
        <Route path="/" element={<Form login={loginHandler} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
