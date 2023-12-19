const {
  createUserController,
  loginUserController,
  resetPasswordController,
} = require("../controllers/userController");

const createUser = async (req, res) => {
  const { newUserData } = req.body

  try {
    const response = await createUserController(newUserData);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const response = await loginUserController(email, password);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await resetPasswordController();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = { createUser, loginUser, resetPassword };
