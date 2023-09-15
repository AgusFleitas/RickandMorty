const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios(`${URL}/${id}`);

    if (!data) res.status(200).send("Not Found");
      const character = {
        id: id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin,
        image: data.image,
        status: data.status,
      };

    res.status(200).json(character);

  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

module.exports = { getCharById };
