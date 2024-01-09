const validate = (input) => {
  let errors = {};
  let numbersRegex = /\d/;

  if (!numbersRegex.test(input.password)) {
    errors.password = "Password must contain a number.";
  }
  if (input.password.length < 6 || input.password.length > 15) {
    errors.password = "Password must be between 6 and 15 characters.";
  }
  if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "Your passwords should match each other.";
  }

  return errors;
};

export default validate;
