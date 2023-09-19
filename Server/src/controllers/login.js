const users = require("../utils/user");

const Log = (req, res) => {
  const { email, password } = req.query;

  const userFound = users.find(
    (user) => user.email === email && user.password === password
  );

  const access = userFound ? true : false;

  res.status(200).json({ access });
};

module.exports = { Log };
