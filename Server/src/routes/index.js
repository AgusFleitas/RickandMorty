const {
  findCharByID,
  findCharByName,
  addCustomChar,
} = require("../handlers/charHandler");
const {
  addFavCharacter,
  deleteFavCharacter,
  getAllFavs,
} = require("../handlers/favHandler");
const { createUser, loginUser } = require("../handlers/userHandler");

const router = require("express").Router();

router.get("/character/search", findCharByName); // Funciona ✅
router.get("/character/:id", findCharByID); // Funciona ✅
router.post("/character/addcustom", addCustomChar); // Funciona ✅
router.post("/register", createUser); // Funciona ✅
router.post("/loginNew", loginUser); // Funciona ✅
router.post("/favcharacter", addFavCharacter); // Funciona ✅
router.delete("/favcharacter", deleteFavCharacter); // Funciona ✅
router.get("/favcharacters", getAllFavs); // Funciona ✅

module.exports = router;
