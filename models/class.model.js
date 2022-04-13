const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ClassesSchema = new Schema(
  {
    className: {
      type: String,
      required: [true, "Bitte Klassenname eintragen"],
    },
    modules: [
      {
        teacher: {
          type: Schema.Types.ObjectId,
          require: false,
          ref: "Teacher",
        },
        subject: {
          type: Schema.Types.ObjectId,
          required: false,
          ref: "Subject",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Classes", ClassesSchema, "classes");
