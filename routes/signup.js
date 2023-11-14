var express = require("express");
var router = express.Router();

const signupController = require("../controllers/signupController");

router.get("/", signupController.signupGet);
router.post("/", signupController.signupPost);

module.exports = router;
