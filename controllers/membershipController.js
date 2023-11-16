const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.membershipGet = asyncHandler(async (req, res, next) => {
    res.render("membership");
});

exports.membershipPost = [
    body("password")
        .trim()
        .escape()
        .custom((value, { req, loc, path }) => {
            if (value !== process.env.MEMBER_PASSCODE) {
                throw new Error("That password is incorrect! Try again.");
            } else {
                return value;
            }
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!res.locals.currentUser) res.render("newmessage_form");
        if (!errors.isEmpty()) {
            res.render("membership", { errors: errors.array() });
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                res.locals.currentUser._id,
                {
                    member: true,
                },
                {}
            );
            if (!updatedUser) res.render("membership");
            else res.redirect("/");
        }
    }),
];
