var express = require("express");
var router = express.Router();

const signoutController = require("../controllers/signoutController");

router.get("/", signoutController.signoutGet);

module.exports = router;
