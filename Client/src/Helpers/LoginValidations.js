const validate = (input) => {
    let errors = {};
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let numbersRegex = /\d/;
  
    if (!emailRegex.test(input.email)) {
      errors.email = "Invalid email.";
    }
    if (!input.email) {
      errors.email = "Enter your email.";
    }
    if (input.email.length >= 35) {
      errors.email = "The email should not contain more than 35 characters.";
    }
    if (!numbersRegex.test(input.password)) {
      errors.password = "Password must contain a number.";
    }
    if (input.password.length < 6 || input.password.length > 15) {
      errors.password = "Password must be between 6 and 15 characters.";
    }
    if (!input.password) {
        errors.password = "Enter your password.";
    }
  
    return errors;
  };
  
  export default validate;