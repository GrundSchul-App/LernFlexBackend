const mongoose = require("mongoose");
const { model, Schema } = mongoose;


const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    // role: {
    //   default: 'admin',
    //   enum: ['admin', 'student'],
    //   type: String,
    //   required: false,
    // },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema, "users");