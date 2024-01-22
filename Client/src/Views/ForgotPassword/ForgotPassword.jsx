import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Notification from "../../Components/Notification/Notification";

import { noEmail, emailSended } from "../../Helpers/ModalObjects";
import validate from "../../Helpers/ForgotValidations";

import style from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  // Estado para mostrar/ocultar las notificaciones.
  const [showNotifNoEmail, setShowNotifNoEmail] = useState(false);
  const [showNotifEmailSended, setShowNotifEmailSended] = useState(false);

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
      const URL = "/forgot-password";
      const response = await axios.post(URL, userEmail);

      if (response.data) {
        setShowNotifEmailSended(true);
        setuserEmail({ email: "" });
      }
    } catch (error) {
      setShowNotifNoEmail(true);
      return;
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
      {showNotifNoEmail && (
        <Notification
          title={noEmail.title}
          message={noEmail.message}
          actionName={noEmail.actionName}
          cancelFunc={() => {
            setShowNotifNoEmail(false);
          }}
        />
      )}
      {showNotifEmailSended && (
        <Notification
          title={emailSended.title}
          message={emailSended.message}
          actionName={emailSended.actionName}
          cancelFunc={() => {
            setShowNotifEmailSended(false);
          }}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
