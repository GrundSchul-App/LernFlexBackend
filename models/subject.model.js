const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const subjectSchema = new Schema(
  {
    subject_code: {
      type: String,
      require: [true, "Bitte Code eintragen"],
    },

    subject_title: {
      type: String,
      required: [true, "Bitte Titel eintragen"],
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const Subject = mongoose.model("Subject", subjectSchema, "subjects");
module.exports = Subject;
