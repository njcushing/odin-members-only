var express = require("express");
var router = express.Router();

const administratorController = require("../controllers/administratorController");

router.get("/", administratorController.administratorGet);
router.post("/", administratorController.administratorPost);

module.exports = router;
