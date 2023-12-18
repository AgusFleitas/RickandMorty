const {
  findCharByID,
  findCharByName,
  addCustomChar
} = require("../handlers/charHandler");
const { createUserController } = require("../controllers/userController");
const { postFav, deleteFav } = require("../controllers/handleFavorites");
const { Log } = require("../controllers/login");

const router = require("express").Router();

router.get("/character/search", findCharByName);
router.get("/character/:id", findCharByID);
router.post("/character/addcustom", addCustomChar);
router.get("/login", Log);
router.post("/fav", postFav);
router.post("/register", createUserController);
router.delete("/fav/:id", deleteFav);

module.exports = router;
