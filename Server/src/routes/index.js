const {
  findCharByID,
  findCharByName,
  addCustomChar
} = require("../handlers/charHandler");
const { createUser } = require("../handlers/userHandler");
const { postFav, deleteFav } = require("../controllers/handleFavorites");
const { Log } = require("../controllers/login");

const router = require("express").Router();

router.get("/character/search", findCharByName); // Funciona ✅
router.get("/character/:id", findCharByID); // Funciona ✅
router.post("/character/addcustom", addCustomChar); // Funciona ✅
router.get("/login", Log);
router.post("/fav", postFav);
router.post("/register", createUser); // Funciona ✅
router.delete("/fav/:id", deleteFav);

module.exports = router;
