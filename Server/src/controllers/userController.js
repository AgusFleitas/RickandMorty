const { User } = require("../DB-Config");
const { encrypt, compare } = require("../helpers/handleBcrypt");

const createUserController = async (userData) => {
  const { name, email, password, country } = userData;

  const verifyExist = await User.findOne({
    where: {
      email,
    },
  });

  if (verifyExist) {
    throw new Error("There is already an account with that email address.");
  } else {
    const hashPassword = await encrypt(password);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
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

  if (!userFound) {
    throw new Error("No account exists with that email.");
  } else {
    const checkPassword = await compare(password, userFound.password);

    if (!checkPassword) {
      throw new Error("Invalid password.");
    } else {
      return userFound;
    }
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
