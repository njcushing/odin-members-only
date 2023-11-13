var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("message_list");
});

module.exports = router;
