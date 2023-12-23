const {
  findCharByID,
  findCharByName,
  addCustomChar
} = require("../handlers/charHandler");
const { createUser, loginUser } = require("../handlers/userHandler");
const { postFav, deleteFav } = require("../controllers/handleFavorites");

const router = require("express").Router();

router.get("/character/search", findCharByName); // Funciona ✅
router.get("/character/:id", findCharByID); // Funciona ✅
router.post("/character/addcustom", addCustomChar); // Funciona ✅
router.post("/register", createUser); // Funciona ✅
router.post("/loginNew", loginUser); // Funciona ✅
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;
