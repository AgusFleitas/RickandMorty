const { Character, CustomCharacter } = require("../DB-Config");
const { Op } = require("sequelize");

const findCharByIDController = async (id) => {
  try {
    const charFound = await Character.findByPk(id);

    if (charFound.name) {
      return charFound;
    } else {
      throw new Error("Character not found.");
    }
  } catch (error) {
    return error;
  }
};

const findCharByNameController = async (name) => {
  try {
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
  } catch (error) {
    return error;
  }
};

const addCustomCharController = async (custom) => {
  const { name, status, species, gender, origin, location, image } = custom;

  try {
    const verifyExist = await CustomCharacter.findOne({
      where: {
        name
      }
    });

    if (verifyExist) {
      throw Error("Character name already exists.");
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
  } catch (error) {
    throw new Error("Your character has not been created: " + error.message);
  }
};

module.exports = {
  findCharByIDController,
  findCharByNameController,
  addCustomCharController,
};
