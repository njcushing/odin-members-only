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
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    member: { type: Boolean },
});

UserSchema.virtual("full_name").get(function () {
    let name = "";
    if (this.first_name && this.last_name) {
        name = `${this.first_name} ${this.last_name}`;
    }
    return name;
});

module.exports = mongoose.model("User", UserSchema);
