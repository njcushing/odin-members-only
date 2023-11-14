const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.signinGet = asyncHandler(async (req, res, next) => {
    res.render("signin_form");
});

exports.signinPost = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Username field must not be empty")
        .escape()
        .isEmail()
        .withMessage(
            "Username must be a VALID email address in the format: name@example.com"
        )
        .normalizeEmail({ all_lowercase: true }),
    body("password", "Password field must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            passport.authenticate("local", {
                successRedirect: "/",
            });
        }
        res.render("signin_form", {
            errors: !errors.isEmpty() ? errors.array() : null,
            authError: errors.isEmpty()
                ? new Error("Invalid login credentials - please try again.")
                : null,
        });
    }),
];
