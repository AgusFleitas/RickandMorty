const validate = (input) => {
  let errors = {};
  let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let numbersRegex = /\d/;

  // if (!input.email) {
  //   errors.email = "Enter your email";
  // }
  if (!emailRegex.test(input.email)) {
    errors.email = "Invalid email";
  }
  if (input.email.length >= 35) {
    errors.email = "No more than 35 characters please";
  }
  if (!numbersRegex.test(input.password)) {
    errors.password = "Password must contain a number";
  }
  if (input.password.length < 6 || input.password.length > 10) {
    errors.password = "Passwors must be between 6 and 10 characters";
  }

  return errors;
};

export default validate;
