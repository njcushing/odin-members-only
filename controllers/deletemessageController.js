const asyncHandler = require("express-async-handler");

const Message = require("../models/message");

exports.deletemessageGet = asyncHandler(async (req, res, next) => {
    if (res.locals.currentUser && res.locals.currentUser.admin) {
        await Message.findByIdAndDelete(req.params.id);
    }
    res.redirect("/");
});
