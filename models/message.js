const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    date_posted: { type: Date },
};

MessageSchema.virtual("url").get(function () {
    return `/messages/${this._id}`;
});

MessageSchema.virtual("date_posted_formatted").get(function () {
    return this.date_posted
        ? DateTime.fromJSDate(this.date_posted).toLocaleString(
              DateTime.DATE_MED
          )
        : null;
});

MessageSchema.virtual("date_posted_yyyy_mm_dd").get(function () {
    return this.date_posted
        ? DateTime.fromJSDate(this.date_posted).toISODate()
        : null;
});

module.exports = mongoose.model("Message", MessageSchema);