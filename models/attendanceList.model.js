const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const attendanceListSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: false,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Classes",
      required: false,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: false,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: false,
    },
    absent: [
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

module.exports = model(
  "AttendanceList",
  attendanceListSchema,
  "attendanceList"
);
