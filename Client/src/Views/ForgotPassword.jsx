import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import validate from "../Helpers/ForgotValidations";

import style from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [userEmail, setuserEmail] = useState({
    email: "",
  });

  const [error, setError] = useState({
    email: "",
  });

  const noErrors = Object.values(error).every((value) => value === "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedUserData = {
      ...userEmail,
      [name]: value,
    };

    setuserEmail(updatedUserData);

    const fieldErrors = validate(updatedUserData);
    setError(fieldErrors);
  };

  const forgotHandler = async (userEmail) => {
    try {
      const URL = "http://localhost:3001/forgot-password";
      const response = await axios.post(URL, userEmail);

      if (response.data) {
        alert(
          "A confirmation email has been sent with a link to reset your password. Please check your inbox."
        );
        setuserEmail({ email: "" });
      }
    } catch (error) {
      alert(error.response.data.Error);
      console.log(error);
    }
  };

  function submitHandler(event) {
    event.preventDefault();

    if (userEmail.email === "") {
      setError((prevError) => ({
        ...prevError,
        email: "Please complete your email.",
      }));
      return;
    }

    forgotHandler(userEmail);

    setuserEmail({
      email: "",
    });
  }

  return (
    <div className={style.forgot}>
      <div className={style.form}>
        <div className={style.wrapper}>
          <form onSubmit={submitHandler}>
            <h1>Forgot your password?</h1>
            <div className={style.inputBox}>
              <label className={style.labels}>Your email:</label>
              <input
                type='email'
                name='email'
                placeholder='Ex: example123@gmail.com'
                onChange={handleChange}
                value={userEmail.email}
              />
              {error.email && <span>{error.email}</span>}
            </div>
            <button className={style.btn} type='submit' disabled={!noErrors}>
              Confirm
            </button>
            <Link to={"/"} className={style.backToLogin}>
              Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
