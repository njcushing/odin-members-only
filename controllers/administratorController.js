const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.administratorGet = asyncHandler(async (req, res, next) => {});

exports.administratorPost = [asyncHandler(async (req, res, next) => {})];
