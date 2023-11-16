const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

exports.signupGet = asyncHandler(async (req, res, next) => {
    res.render("signup_form");
});

exports.signupPost = [
    body("firstNames", "First Name(s) field must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("lastName", "Last Name field must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
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
    body("confirmPassword")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Confirm Password field must not be empty")
        .escape()
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            } else {
                return value;
            }
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                bcrypt.hash(
                    req.body.password,
                    10,
                    async (err, hashedPassword) => {
                        if (err) {
                            return err;
                        } else {
                            try {
                                const user = new User({
                                    first_name: req.body.firstNames,
                                    last_name: req.body.lastName,
                                    email: req.body.username,
                                    password: hashedPassword,
                                    member: false,
                                    admin: false,
                                });
                                const result = await user.save();
                                passport.authenticate("local", {
                                    successRedirect: "/",
                                });
                                res.redirect("/sign-in");
                            } catch (err) {
                                if (err.code === 11000) {
                                    res.render("signup_form", {
                                        authError:
                                            "This email is already in use. Please use another one.",
                                    });
                                }
                            }
                        }
                    }
                );
            } catch (err) {
                return next(err);
            }
        } else {
            res.render("signup_form", {
                errors: !errors.isEmpty() ? errors.array() : null,
            });
        }
    }),
];
