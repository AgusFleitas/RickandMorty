const validate = (input) => {
    let errors = {};
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  
    if (!emailRegex.test(input.email)) {
      errors.email = "Invalid email.";
    }
    if (!input.email) {
      errors.email = "Enter your email.";
    }
    if (input.email.length >= 35) {
      errors.email = "The email should not contain more than 35 characters.";
    }
  
    return errors;
  };
  
  export default validate;