const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const teacherSchema = new Schema(
  {
    firstName: {
        type: String,
        required: [true, "Bitte Name eintragen"],
        minlength: 3,
        maxLength: 20,
        }, 
    lastName: {
      type: String,
      required: [true, "Bitte Name eintragen"],
      minlength: 3,
      maxLength: 20,
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
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Classes",
        required: false,
      },
    ],
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: false,
      },
    ],
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
    versionKey: false,
  }
);
module.exports = model("Teacher", teacherSchema);
