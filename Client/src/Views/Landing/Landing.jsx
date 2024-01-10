import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "boxicons";

import landingVideo from "../../video/landing.mp4";
import validate from "../../Helpers/LoginValidations";

import style from "./Landing.module.css";

const Landing = () => {
  // Estado para el formulario.
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  // Estado para los errores del formulario.
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Estado para pausar/reaunador el video.
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef(null);

  const navigate = useNavigate();

  // useEffect para comprobar si existe una sesión de usuario con un token vigente.
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    
    if (userFromStorage) {
      const { token } = JSON.parse(userFromStorage);
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenPayload = JSON.parse(window.atob(token.split('.')[1]))
      if (tokenPayload.exp > currentTime) {
        navigate("/home")
      }
    }
  });

  // Función que maneja los cambios en los inputs.
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedUserData = {
      ...userData,
      [name]: value,
    };
  
    setuserData(updatedUserData);
  
    const fieldErrors = validate(updatedUserData);
    setErrors(fieldErrors);
  };

  // Función de login.
  async function loginHandler(userData) {
    try {
      const URL = "http://localhost:3001/loginNew";
      const { data } = await axios.post(URL, userData);
  
      if (data) {
        localStorage.setItem("user", JSON.stringify({ id: data.user.id, name: data.user.name, token: data.tokenSession}))
        navigate("/home")
      }
    } catch (error) {
      alert(error.response.data.Error)
    }
  }

  // Función que se ejecuta al hacer submit.
  function submitHandler(event) {
    event.preventDefault();

    loginHandler(userData);
  }

  // Si hay errores en el formulario, el botón no funciona.
  function disableHandler() {
    let disabled;
    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true;
        break;
      }
    }

    return disabled;
  }

  // Play/Stop background button.
  function handleVideoToggle() {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsVideoPaused(!isVideoPaused);
    }
  }

  return (
    <div className={style.Form}>
      <div className={style.wrapper}>
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          <div className={style.inputBox}>
            <input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleChange}
              placeholder='example123@gmail.com'
              title="Complete your email."
            />
            <box-icon type='solid' name='user' color='white'></box-icon>
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className={style.inputBox}>
            <input
            title="Complete your password."
              type='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
              placeholder='Password'
            />
            <box-icon name='lock-alt' type='solid' color='white'></box-icon>
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className={style.rememberForgot}>
            <label>
              <input type='checkbox' title="For security reasons, only your username will be saved. You must complete your password next time you need to login."/>
              Remember email
            </label>
            <a href='/forgotpassword'>Forgot password?</a>
          </div>
          <button
            className={style.btn}
            disabled={disableHandler()}
            type='submit'
          >
            Login
          </button>
          <div className={style.registerLink}>
            <p>
              Don't have an account? <a href='/register'>Sign Up</a>
            </p>
          <a className={style.guest} href='/home'>Enter as a guest</a>
          </div>
        </form>
      </div>
      <button
        title='Turn off/on background'
        className={style.turnOff}
        onClick={handleVideoToggle}
      >
        {isVideoPaused ? (
          <box-icon name='video' type='solid' color='#555'></box-icon>
        ) : (
          <box-icon name='video-off' type='solid' color='#555'></box-icon>
        )}
      </button>
      <div className={style.videoWrapper}>
        <video
          ref={videoRef}
          src={landingVideo}
          autoPlay
          muted
          loop
          className={style.bgVideo}
        />
      </div>
    </div>
  );
};

export default Landing;
