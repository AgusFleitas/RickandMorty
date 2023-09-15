const users = require("../utils/user");
const { clearFav } = require("./handleFavorites");

const Log = (req, res) => {
  const { email, password } = req.query;

  const userFound = users.find(
    (user) => user.email === email && user.password === password
  );

  if (userFound) {
    res.status(200).json({ access: true });
    clearFav(req, res);
  } else {
    res.status(200).json({ access: false });
  }
};

module.exports = { Log };
