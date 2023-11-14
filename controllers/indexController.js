const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        res.redirect("/sign-in");
    }
    res.render("index");
});
