const {
  findCharByIDController,
  findCharByNameController,
  addCustomCharController,
} = require("../controllers/charController");

const findCharByID = async (req, res) => {
  const { id } = req.params;
  
  try {
    const response = await findCharByIDController(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

const findCharByName = async (req, res) => {
  const { name } = req.query;

  try {
    const response = await findCharByNameController(name);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.messsage });
  }
};

const addCustomChar = async (req, res) => {
  const { custom } = req.body;

  try {
    const response = await addCustomCharController(custom);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  findCharByID,
  findCharByName,
  addCustomChar,
};
