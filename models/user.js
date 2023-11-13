const mongoose = require("mongoose");
const { isEmail } = require("express-validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        required: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [
            isEmail,
            "Please enter a valid email address in the format: example@example.com",
        ],
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    member: { type: Boolean },
});

module.exports = mongoose.model("User", UserSchema);
