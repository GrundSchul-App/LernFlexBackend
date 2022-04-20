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
    role: {
      type: String,
      required: true,
    },    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = model("User", userSchema, "users");

export default userModel;
