const { User, Character } = require("../DB-Config");

const addFavCharacterController = async (userID, charID) => {
  const user = await User.findByPk(userID);
  const character = await Character.findByPk(charID);

  if (user && character) {
    await user.addCharacter(character);
    return (character)
  } else {
    throw new Error(
      "An error occurred trying to add the character to Favorites."
    );
  }
};

const deleteFavCharacterController = async (userID, charID) => {
  const user = await User.findByPk(userID);
  const character = await Character.findByPk(charID);

  if (user && character) {
    await user.removeCharacter(character);
    return (character)
  } else {
    throw new Error(
      "An error occurred trying to remove the character from Favorites."
    );
  }
};

const getOneFavController = async (userID, charID) => {
  const user = await User.findByPk(userID);
  if (!user) {
    throw new Error("User not found");
  }

  const character = await Character.findByPk(charID);
  if (!character) {
    throw new Error ("Character not found");
  }

  const isFavorite = await user.hasCharacter(character);
  return isFavorite;
};

const getAllFavsController = async (userID) => {
  const user = await User.findByPk(userID, {
    include: [{ model: Character, through: "Favorites" }],
  });

  if (user) {
    const favoriteCharacters = user.Characters;
    return favoriteCharacters;
  } else {
    throw new Error("An error ocurred trying to get your Favorite characters.");
  }
};

module.exports = {
  addFavCharacterController,
  deleteFavCharacterController,
  getOneFavController,
  getAllFavsController,
};
