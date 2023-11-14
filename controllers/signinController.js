const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.signinGet = asyncHandler(async (req, res, next) => {
    res.render("signin_form");
});

exports.signinPost = [
    asyncHandler(async (req, res, next) => {
        // ...
    }),
];
