import { Link } from "react-router-dom";

import countryNames from "../Helpers/Countries";

import style from "./Register.module.css";

const Register = () => {
  return (
    <div className={style.register}>
      <div className={style.Form}>
        <div className={style.wrapper}>
          <form>
            <h1>Create account</h1>
            <div className={style.inputBox}>
              <label className={style.labels}>Email:</label>
              <input
                type='text'
                name='email'
                placeholder='example123@gmail.com'
              />
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Password:</label>
              <input type='password' name='password' placeholder='Password' />
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Confirm password:</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm password'
              />
            </div>
            <div className={style.inputBox}>
              <label className={style.labels}>Select your country:</label>
              <select className={style.countries} name='country'>
                <option hidden defaultValue>
                  Select your country
                </option>
                {countryNames.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <button className={style.btn} type='submit'>
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
