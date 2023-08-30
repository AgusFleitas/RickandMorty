const validate = (input) => {
  let errors = {};
  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let numbersRegex = /\d/;

  // if (!input.email) {
  //   errors.email = "Enter your email";
  // }
  if (!emailRegex.test(input.email)) {
    errors.email = "Ingrese un email válido.";
  }
  if (input.email.length >= 35) {
    errors.email = "El email debe contener menos de 35 caracteres.";
  }
  if (!numbersRegex.test(input.password)) {
    errors.password = "La contraseña debe tener al menos un número";
  }
  if (input.password.length < 6 || input.password.length > 10) {
    errors.password = "La contraseña debe contener de 6 a 10 caracteres.";
  }

  return errors;
};

export default validate;
