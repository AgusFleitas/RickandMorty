const { getCharById } = require("../controllers/getCharById");
const { postFav, deleteFav } = require("../controllers/handleFavorites");
const { Log } = require("../controllers/login");

const router = require("express").Router();

router.get("/character/:id", getCharById);
router.get("/login", Log);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;