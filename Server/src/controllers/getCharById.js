const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios(`${URL}/${id}`);

    const character = {
      id: data.id,
      status: data.status,
      name: data.name,
      species: data.species,
      location: data.location?.name,
      origin: data.origin?.name,
      image: data.image,
      gender: data.gender,
    };

    character.name
      ? res.status(200).json(character)
      : res.status(404).json({message: "Not Found"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = { getCharById };
