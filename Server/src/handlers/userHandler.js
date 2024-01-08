const {
  createUserController,
  loginUserController,
  forgotPasswordController,
} = require("../controllers/userController");

const createUser = async (req, res) => {
  try {
    const response = await createUserController(req.body);
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

const forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const response = await forgotPasswordController(email);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = { createUser, loginUser, forgotPassword };
