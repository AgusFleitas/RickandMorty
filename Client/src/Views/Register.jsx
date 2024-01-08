import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import countryNames from "../Helpers/Countries";
import validate from "../Helpers/RegisterValidations";

import style from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
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

  // Constante para confirmar que no existan errores.
  const noErrors = Object.values(errors).every((value) => value === "");

  // Función que realiza la solicitud de registro al servidor.
  const registerHandler = async (userData) => {
    try {
      const URL = "http://localhost:3001/register";
      const { data } = await axios.post(URL, userData);

      if (data) {
        alert("Register successfully. We'll redirect you to the login section again.")
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.Error)
      console.log(error);
    }
  };

  // Función que se ejecuta al hacer submit.
  function submitHandler(event) {
    event.preventDefault();

    if (userData.name === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please complete your name.",
      }));
      return;
    }
    if (userData.email === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please complete your email.",
      }));
      return;
    }
    if (userData.password === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please complete your password.",
      }));
      return;
    }
    if (userData.confirmPassword === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please confirm your password.",
      }));
      return;
    }
    if (!userData.country || userData.country === "Select your country") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        country: "Please select your country.",
      }));
      return;
    }

    registerHandler(userData);

    setuserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
    })
  }

  return (
    <div className={style.register}>
      <div className={style.Form}>
        <div className={style.wrapper}>
          <form onSubmit={submitHandler}>
            <h1>Create account</h1>
            <div className={style.inputBox}>
              <label className={style.labels}>Name:</label>
              <input
                type='text'
                name='name'
                placeholder='Ex: Mike Johnson'
                onChange={handleChange}
                value={userData.name}
              />
              {errors.name && <span>{errors.name}</span>}
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Email:</label>
              <input
                type='email'
                name='email'
                placeholder='example123@gmail.com'
                onChange={handleChange}
                value={userData.email}
              />
              {errors.email && <span>{errors.email}</span>}
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Password:</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                value={userData.password}
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Confirm password:</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm password'
                onChange={handleChange}
                value={userData.confirmPassword}
              />
              {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Select your country:</label>
              <select 
              className={style.countries} 
              name='country'
              onChange={handleChange}
              value={userData.country}
              >
                <option hidden defaultValue>
                  Select your country
                </option>
                {countryNames.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <span>{errors.country}</span>}
            </div>
            <button className={style.btn} type='submit' disabled={!noErrors}>
              Create account
            </button>
            <p>Already have an account?</p>
            <Link to={"/"} className={style.backToLogin}>
              Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
