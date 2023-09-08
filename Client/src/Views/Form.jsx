import { useState } from "react";
import validate from "../Helpers/Validation";

const Form = ({login}) => {

    const [userData, setuserData] = useState({
        email:"",
        password:""
    });

    const [errors, setErrors] = useState({})


    const handleChange = (event) => {
        setuserData({...userData, [event.target.name]: event.target.value})

        setErrors(validate({...userData, [event.target.name] : event.target.value,}));
    }

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
            <form onSubmit={submitHandler}>
                <div>
                    <label className="LabelForm">Email: </label>
                    <input type="text" name="email" value={userData.email} onChange={handleChange}/>
                    <label className="LabelForm">Password: </label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange}/>
                    {errors.password && <span>{errors.password}</span>}
                    <button disabled={disableHandler()} type="submit">Submit</button>
                </div>
            </form>
    );
}

export default Form;