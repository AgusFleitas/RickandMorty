const { User } = require("../DB-Config");

const createUserController = async (newUserData) => {
  const { name, email, password, country } = newUserData;

  const verifyExist = await User.findOne({
    where: {
      email,
    },
  });

  if (verifyExist) {
    throw new Error("There is already an account with that email address.");
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
      country,
    });

    return newUser;
  }
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
