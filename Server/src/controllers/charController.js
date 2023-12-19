const { Character, CustomCharacter } = require("../DB-Config");
const { Op } = require("sequelize");

const findCharByIDController = async (id) => {
  const charFound = await Character.findByPk(id);

  if (charFound.name) {
    return charFound;
  } else {
    throw new Error("Character not found.");
  }
};

const findCharByNameController = async (name) => {
  const charMatches = await Character.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });

  if (charMatches.length >= 1) {
    return charMatches;
  } else {
    throw new Error("Not matches found.");
  }
};

const addCustomCharController = async (custom) => {
  const { name, status, species, gender, origin, location, image } = custom;

  const verifyExist = await CustomCharacter.findOne({
    where: {
      name,
    },
  });

  if (verifyExist) {
    throw new Error("Character name already exists.");
  } else {
    const newCustomChar = await CustomCharacter.create({
      name,
      status,
      species,
      gender,
      origin,
      location,
      image,
    });

    return newCustomChar;
  }
};

module.exports = {
  findCharByIDController,
  findCharByNameController,
  addCustomCharController,
};
