const asyncHandler = require("express-async-handler");

const Message = require("../models/message");

exports.index = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate("author").exec();
    res.render("index", { messages: messages });
});
