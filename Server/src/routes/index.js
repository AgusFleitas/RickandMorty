const {
  findCharByID,
  findCharByName,
  addCustomChar,
} = require("../handlers/charHandler");
const {
  addFavCharacter,
  deleteFavCharacter,
  getOneFav,
  getAllFavs,
} = require("../handlers/favHandler");
const {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword
} = require("../handlers/userHandler");
const { checkAuth, checkTokenForPass } = require("../middleware/auth");

const router = require("express").Router();

router.get("/character/search", findCharByName); // Funciona ✅
router.get("/character/:id", findCharByID); // Funciona ✅
router.post("/character/addcustom", addCustomChar); // Funciona ✅
router.post("/register", createUser); // Funciona ✅
router.post("/loginNew", loginUser); // Funciona ✅
router.post("/favcharacter", addFavCharacter); // Funciona ✅
router.delete("/favcharacter", deleteFavCharacter); // Funciona ✅
router.get("/favcharacter", getOneFav); // Funciona ✅
router.get("/favcharacters", checkAuth, getAllFavs); // Funciona ✅
router.post("/forgot-password", forgotPassword); // Funciona ✅
router.put("/reset-password", checkTokenForPass, resetPassword); 

module.exports = router;
