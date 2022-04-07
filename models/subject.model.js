const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Bitte Name eintragen"],
    
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const Subject = model("Subject", subjectSchema);
