const { verifyToken } = require("../helpers/generateToken");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);

    if (tokenData.id) {
      next();
    } else {
      return res.status(403).json({ Error: "You don't have access." });
    }
  } catch (error) {
    return res.status(403).json({ Error: "You don't have access." });
  }
};

module.exports = { checkAuth };
