const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const homeworkSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Bitte Title eintragen"],
      minlength: 3,
      maxlength: 30,
    },
    link: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 30,
    },
    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ["info", "homework", "online"],
      default: "homework",
      required: [true, "Bitte Type eintragen"],
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
   
  }
);

module.exports = model("Homework", homeworkSchema, "homework");
