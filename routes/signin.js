var express = require("express");
var router = express.Router();

const signinController = require("../controllers/signinController");

router.get("/", signinController.signinGet);
router.post("/", signinController.signinPost);

module.exports = router;
