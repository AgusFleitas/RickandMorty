const { User } = require("../DB-Config");

const createUserController = async (name, email, password, country) => {
  const newUser = await User.create({
    name,
    email,
    password,
    country,
  });

  return newUser;
};

const loginUserController = async (email, password) => {
  const userFound = await User.findOne({
    where: {
      email,
    },
  });

  if (password === userFound.password) {
    return "Access successfully!";
  }
};

const resetPasswordController = async (email) => {
  const userFound = await User.findOne({
    where: {
      email,
    },
  });

  // Nodemailer para el reseteo de contraseña
};

module.exports = {
  createUserController,
  loginUserController,
  resetPasswordController,
};
