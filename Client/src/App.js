import { Routes, Route, useLocation} from "react-router-dom";

import Nav from "./Components/Nav/Nav.jsx";

import Home from "./Views/Home.jsx";
import Favorites from "./Views/Favorites.jsx";
import About from "./Views/About.jsx";
import Detail from "./Views/Detail.jsx";
import Landing from "./Views/Landing.jsx";
import ErrorPage from "./Views/ErrorPage.jsx";
import Register from "./Views/Register.jsx";

import style from "./App.module.css";

function App() {
  const location = useLocation();

  // Delete character from Home.

  // function closeHandler(id) {
  //   let filteredCharacters = characters.filter(
  //     (character) => character.id !== id
  //   );

  //   setCharacters(filteredCharacters);
  // }

  // Render ↓

  return (
    <div className={style.App}>
      {location.pathname !== "/" && location.pathname !== "/register" && (
        <Nav />
      )}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
