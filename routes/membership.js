var express = require("express");
var router = express.Router();

const membershipController = require("../controllers/membershipController");

router.get("/", membershipController.membershipGet);
router.post("/", membershipController.membershipPost);

module.exports = router;
