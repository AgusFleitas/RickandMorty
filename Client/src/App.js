import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Nav from "./Components/Nav/Nav.jsx";

import Home from "./Views/Home.jsx";
import Favorites from "./Views/Favorites.jsx";
import About from "./Views/About.jsx";
import Detail from "./Views/Detail.jsx";
import Landing from "./Views/Landing.jsx";
import Register from "./Views/Register.jsx";
import ForgotPassword from "./Views/ForgotPassword.jsx";
import ResetPassword from "./Views/ResetPassword.jsx";
import ErrorPage from "./Views/ErrorPage.jsx";

import style from "./App.module.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  const isJWT = (token) => {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/;
    return jwtRegex.test(token);
  };

  // useEffect para saber si hay un token al momento de acceder a /resetpassword
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const passwordResetRoutes = ['/resetpassword'];
  
    if (passwordResetRoutes.includes(location.pathname)) {
      if (!token) {
        navigate('/otra-ruta');
      } else {
        const verifyToken = isJWT(token)

        if (verifyToken) {
          setToken(token)
        } else {
          navigate('/otra-ruta');
        }
      }
    }
  }, [location.pathname, location.search, navigate]);

  // Render ↓

  return (
    <div className={style.App}>
      {location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/forgotpassword" && (
        <Nav />
      )}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        {token ? <Route path='/resetpassword' element={<ResetPassword />} /> : null}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
