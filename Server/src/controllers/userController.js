const { User } = require("../DB-Config");
const { encrypt, compare } = require("../helpers/handleBcrypt");
const { tokenSign, tokenSignResetPass } = require("../helpers/generateToken");
const { transporter } = require("../config/mailer");
const { passwordForgot } = require("../helpers/mailObject");

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
      const tokenSession = await tokenSign(userFound);
      return { user: userFound, tokenSession };
    }
  }
};

const forgotPasswordController = async (email) => {
  const userFound = await User.findOne({
    where: {
      email,
    },
  });

  if (!userFound) {
    throw new Error("User not found with the email.");
  } else {
    const token = await tokenSignResetPass(userFound);

    userFound.resetPasswordToken = token;
    await userFound.save();

    const mailResponse = await transporter.sendMail(
      passwordForgot(email, token)
    );
    return mailResponse;
  }
};

const resetPasswordController = async (email, newPassword) => {
  const userFound = await User.findOne({
    where: {
      email,
    },
  });

  if (!userFound) {
    throw new Error("User not found with the email.");
  } else {
    const hashPassword = await encrypt(newPassword);

    await userFound.update({ password: hashPassword });

    return userFound;
  }
};
module.exports = {
  createUserController,
  loginUserController,
  forgotPasswordController,
  resetPasswordController,
};
