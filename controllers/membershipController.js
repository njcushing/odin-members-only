const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.membershipGet = asyncHandler(async (req, res, next) => {
    res.render("membership");
});

exports.membershipPost = asyncHandler(async (req, res, next) => {});
