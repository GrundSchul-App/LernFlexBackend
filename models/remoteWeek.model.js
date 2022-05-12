const mongoose = require("mongoose");
const { model, Schema } = mongoose;

/* const weekSchema = new mongoose.Schema(
  {
    monday: [{
      subject: { type: Schema.Types.ObjectId, require: true, ref: "Subject" },
      homeworkText: { type: String, required: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
    }],
    tuesday: [{
      subject: { type: Schema.Types.ObjectId, require: true, ref: "Subject" },
      homeworkText: { type: String, required: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
    }],
    wednesday: [{
      subject: { type: Schema.Types.ObjectId, require: true, ref: "Subject" },
      homeworkText: { type: String, required: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
    }],
    thursday: [{
      subject: { type: Schema.Types.ObjectId, require: true, ref: "Subject" },
      homeworkText: { type: String, required: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
    }],
    friday: [{
      subject: { type: Schema.Types.ObjectId, require: true, ref: "Subject" },
      homeworkText: { type: String, required: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
); */

const RemoteWeekSchema = new Schema(
  {
    infoData: {
      type: Schema.Types.ObjectId,
      require: false,
      ref: "Homework",      
    },
    classId: {
      type: Schema.Types.ObjectId,
      require: [true, "Bitte Klasse eintragen"],
      ref: "Classes",
    },
    startWeekDate: {
      type: Date,
      require: [true, "Bitte Datum eintragen"],
    },
    monday: [
      {
      subject: { type: Schema.Types.ObjectId, require: false, ref: "Subject" },
      homeworkText: { type: String, require: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
      default: [],
    }],
    tuesday:  [
      {
      subject: { type: Schema.Types.ObjectId, require: false, ref: "Subject" },
      homeworkText: { type: String, require: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
      default: [],
    }],
    wednesday:  [
      {
      subject: { type: Schema.Types.ObjectId, require: false, ref: "Subject" },
      homeworkText: { type: String, require: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
      default: [],
    }],
    thursday:  [
      {
      subject: { type: Schema.Types.ObjectId, require: false, ref: "Subject" },
      homeworkText: { type: String, require: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
      default: [],
    }],
    friday:  [
      {
      subject: { type: Schema.Types.ObjectId, require: false, ref: "Subject" },
      homeworkText: { type: String, require: false },
      homeworkData: {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Homework",
      },
      default: [],
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("RemoteWeek", RemoteWeekSchema, "remoteWeeks");