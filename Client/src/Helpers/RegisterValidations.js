const validate = (input) => {
  let errors = {};
  let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let nameRegex = /^[a-zA-Z\s]+$/i
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
  if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "Your passwords should match each other."
  }
  if (input.name.length < 4 || input.name.length > 30) {
    errors.username = "Name must be between 4 and 30 characters."
  }
  if (!nameRegex.test(input.name)) {
    errors.name = "Invalid name. The name should not contain numbers or special characters."
  }
  if(!input.name) {
    errors.username = "Insert your name."
  }

  if(input.country === "Select your country") {
    errors.country = "Select your country."
  } 

  return errors;
};

export default validate;
