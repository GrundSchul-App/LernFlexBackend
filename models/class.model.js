const mongoose = require("mongoose");

const ClassesSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Bitte Klassenname eintragen"],
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ["Subject", "Teacher"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Classes", ClassesSchema);
