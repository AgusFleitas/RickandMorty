const {
  addFavCharacterController,
  deleteFavCharacterController,
  getAllFavsController,
} = require("../controllers/favController");

const addFavCharacter = async (req, res) => {
  const { userID, charID } = req.body;

  try {
    const response = await addFavCharacterController(userID, charID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const deleteFavCharacter = async (req, res) => {
  const { userID, charID } = req.body;

  try {
    const response = await deleteFavCharacterController(userID, charID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const getAllFavs = async (req, res) => {
  const { userID } = req.body;

  try {
    const response = await getAllFavsController(userID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  addFavCharacter,
  deleteFavCharacter,
  getAllFavs,
};
