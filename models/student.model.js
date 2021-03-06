const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const StudentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Bitte ame eintragen"],
      minlength: 2,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: [true, "Bitte Name eintragen"],
      minlength: 2,
      maxLength: 20,
    },
    birthDate: {
      type: Date,
      required: [true, "Bitte Datum eintragen"],
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Bitte Email eintragen"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Bitte eine richtige Email eintragen",
      ],
    },

    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Classes" },
    homeworks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Homework" }],
  },
  {
    timestamps: true,
   }
);

module.exports = model("Student", StudentSchema, "students");
