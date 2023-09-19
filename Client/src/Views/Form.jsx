import { useState } from "react";
import validate from "../Helpers/Validation";
import "boxicons";
import "./Form.css";

import landingVideo from "../video/landing.mp4";

const Form = ({ login }) => {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "Email required", //
    password: "Password required",
  });

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

  return (
    <div>
      <div className='wrapper'>
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          <div className='input-box'>
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
          <div className='input-box'>
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
          <div className='remember-forgot'>
            <label>
              <input type='checkbox' />
              Remember me
            </label>
            <a href='#'>Forgot password?</a>
          </div>
          <button className='btn' disabled={disableHandler()} type='submit'>
            Login
          </button>
          <div className='register-link'>
            <p>
              Don't have and account? <a href='#'>Register</a>
            </p>
          </div>
        </form>
      </div>
      <div className="video-wrapper">
        <video src={landingVideo} autoPlay muted loop className='bg-video' />
      </div>
    </div>
  );
};

export default Form;
