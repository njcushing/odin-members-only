var express = require("express");
var router = express.Router();

const newmessageController = require("../controllers/newmessageController");

router.get("/", newmessageController.newmessageGet);
router.post("/", newmessageController.newmessagePost);

module.exports = router;
