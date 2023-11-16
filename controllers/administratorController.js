const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.administratorGet = asyncHandler(async (req, res, next) => {
    res.render("administrator");
});

exports.administratorPost = [
    body("password")
        .trim()
        .escape()
        .custom((value, { req, loc, path }) => {
            if (value !== process.env.ADMIN_PASSCODE) {
                throw new Error("That password is incorrect! Try again.");
            } else {
                return value;
            }
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!res.locals.currentUser) res.render("administrator");
        if (!errors.isEmpty()) {
            res.render("administrator", { errors: errors.array() });
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                res.locals.currentUser._id,
                {
                    admin: true,
                },
                {}
            );
            if (!updatedUser) res.render("administrator");
            else res.redirect("/");
        }
    }),
];
