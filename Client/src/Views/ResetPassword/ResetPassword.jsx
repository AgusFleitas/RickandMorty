import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import validate from "../../Helpers/ResetValidations";

import style from "./ResetPassword.module.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    setToken(token);
  }, [location.search]);

  const [userPass, setUserPass] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const noErrors = Object.values(error).every((value) => value === "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedUserData = {
      ...userPass,
      [name]: value,
    };

    setUserPass(updatedUserData);

    const fieldErrors = validate(updatedUserData);
    setError(fieldErrors);
  };

  const resetHandler = async (userPass) => {
    try {
      const decoded = jwtDecode(token);
      const URL = "http://localhost:3001/reset-password";
      const response = await axios.put(URL, {
        email: decoded.email,
        newPassword: userPass.password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        alert(
          "Your password was updated succesfully. Please, try to log in again."
        );
        setUserPass({
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.Error);
      console.log(error);
    }
  };

  function submitHandler(event) {
    event.preventDefault();

    if (userPass.password === "") {
      setError((prevError) => ({
        ...prevError,
        email: "Please complete your password.",
      }));
      return;
    }

    if (userPass.confirmPassword === "") {
      setError((prevError) => ({
        ...prevError,
        email: "Please confirm your password.",
      }));
      return;
    }

    resetHandler(userPass);

    setUserPass({
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className={style.reset}>
      <div className={style.form}>
        <div className={style.wrapper}>
          <form onSubmit={submitHandler}>
            <h1>Reset password</h1>
            <div className={style.inputBox}>
              <label className={style.labels}>Your new password:</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                value={userPass.password}
              />
              {error.password && <span>{error.password}</span>}
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Confirm password:</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm password'
                onChange={handleChange}
                value={userPass.confirmPassword}
              />
              {error.confirmPassword && <span>{error.confirmPassword}</span>}
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

export default ResetPassword;
