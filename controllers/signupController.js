const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.signupGet = asyncHandler(async (req, res, next) => {
    res.render("signup_form");
});

exports.signupPost = [
    asyncHandler(async (req, res, next) => {
        // ...
    }),
];
