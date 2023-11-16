const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Message = require("../models/message");

exports.newmessageGet = asyncHandler(async (req, res, next) => {
    res.render("newmessage_form");
});

exports.newmessagePost = [
    body("title", "Title field must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("text", "Text field must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!res.locals.currentUser) res.render("newmessage_form");
        const message = new Message({
            author: res.locals.currentUser._id,
            title: req.body.title,
            text: req.body.text,
            date_posted: new Date(),
        });
        if (!errors.isEmpty()) {
            res.render("newmessage_form", {
                message: message,
                errors: errors.array(),
            });
        } else {
            await message.save();
            res.redirect("/");
        }
    }),
];
