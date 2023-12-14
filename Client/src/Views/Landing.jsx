import { useState, useRef } from "react";
import validate from "../Helpers/Validation";
import "boxicons";
import style from "./Landing.module.css";

import landingVideo from "../video/landing.mp4";

const Landing = ({ login }) => {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "Email required", //
    password: "Password required",
  });

  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef(null);

  const handleChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });

    setErrors(
      validate({ ...userData, [event.target.name]: event.target.value })
    );
  };

  function submitHandler(event) {
    event.preventDefault();

    login(userData);
  }

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
              type='text'
              name='email'
              value={userData.email}
              onChange={handleChange}
              placeholder='example123@gmail.com'
            />
            <box-icon type='solid' name='user' color='white'></box-icon>
            <span>{errors.email}</span>
          </div>
          <div className={style.inputBox}>
            <input
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
              <input type='checkbox' />
              Remember me
            </label>
            <a href='#'>Forgot password?</a>
          </div>
          <button className={style.btn} disabled={disableHandler()} type='submit'>
            Login
          </button>
          <div className={style.registerLink}>
            <p>
              Don't have an account? <a href='/register'>Sign Up</a>
            </p>
          </div>
        </form>
      </div>
      <button title="Turn off/on background" className={style.turnOff} onClick={handleVideoToggle}>
        {isVideoPaused ? (<box-icon name='video' type='solid' color='#555'></box-icon>) : (<box-icon name='video-off' type='solid' color='#555'></box-icon>)}
        </button>
      <div className={style.videoWrapper}>
        <video ref={videoRef} src={landingVideo} autoPlay muted loop className={style.bgVideo} />
      </div>
    </div>
  );
};

export default Landing;
