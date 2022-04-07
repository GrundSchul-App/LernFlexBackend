const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true,
        // minlength: 3,
        // maxLength: 20,
        }, 
    lastName: {
      type: String,
      required: true,
      // minlength: 3,
      // maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Bitte eine richtige Email eintragen",
      ],
    },
    classes: [
    
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

const Teacher = mongoose.model("Teacher", teacherSchema)
module.exports =Teacher ;
