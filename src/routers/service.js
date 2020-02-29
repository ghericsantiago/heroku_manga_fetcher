const router = require("express").Router();
const serviceController = require("../controllers/serviceController");

router.get("/titles", serviceController.index);
router.post("/chapters", serviceController.getChapters);

module.exports = router;
