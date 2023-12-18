const {
  createUser,
  loginUser,
  resetPassword,
} = require("../controllers/userController");

const createUser = async (req, res) => {
  try {
    const response = await createUserController();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const response = await loginUserController();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await resetPasswordController();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser, resetPassword };
