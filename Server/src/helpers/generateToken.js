require('dotenv').config();
const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    }
  );
};

const tokenSignResetPass = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { error: 'Invalid token' };
    } else {
      return { error: 'Unexpected error' };
    }
  }
};

module.exports = { tokenSign, tokenSignResetPass, verifyToken };
