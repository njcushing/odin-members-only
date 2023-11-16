var express = require("express");
var router = express.Router();

const deletemessageController = require("../controllers/deletemessageController");

router.get("/:id", deletemessageController.deletemessageGet);

module.exports = router;
