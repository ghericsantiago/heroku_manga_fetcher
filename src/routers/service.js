const router = require("express").Router();
const serviceController = require("../controllers/serviceController");

router.get("/titles", serviceController.index);

module.exports = router;
