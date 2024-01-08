const { verifyToken } = require("../helpers/generateToken");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);

    if (tokenData.id) {
      next();
    } else {
      return res.status(403).json({ Error: "You need to log in to access." });
    }
  } catch (error) {
    return res.status(403).json({ Error: "You need to log in to access." });
  }
};

const checkTokenForPass = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);

    if (tokenData.id) {
      next();
    } else {
      return res.status(403).json({ Error: "Authorization required to proceed with this action." });
    }
  } catch (error) {
    return res.status(403).json({ Error: "Authorization required to proceed with this action." });
  }
};

module.exports = { checkAuth, checkTokenForPass };
