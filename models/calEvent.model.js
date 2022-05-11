const mongoose = require("mongoose");
const { Schema, model } = mongoose;
let date = new Date();
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Bitte titel eintragen"],
      // minlength: 2,
      // maxLength: 20,
    },
    date: {
      type: Date,
      default: Date.now,
      required: false,
    },
    description: {
      type: String,
      required: false,
      // minlength: 5,
      // maxlength: 45,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema, "events");