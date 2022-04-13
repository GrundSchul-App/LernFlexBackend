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
    },
    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ["info", "homework", "online"],
      default: "homework",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: false,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Homework", homeworkSchema, "homework");
