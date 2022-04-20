const Classes = require('../models/class.model');
require('../models/student.model');
require("../models/teacher.model")
require("../models/subject.model")


async function getClasses (req, res) {
  try {
    const classes = await Classes.find({}).populate("modules.teacher").populate("modules.subject");
    res.status(200).json({ message: "success", data: classes });
     //classes, totalClasses: classes.length});
  } catch (error) {
    res.status(500).json({ error });
  }
}










async function getClass(req, res) {
  try {
    const singleClass = await Classes.findOne({_id: req.params.id});
    res.status(200).json({ singleClass });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function createClass (req, res) {
  try {
    const newClass = await Classes.create(req.body);
    res.status(201).json({newClass, success: "Class successfully created"});
  } catch (error) {
    res.status(500).json({ error });
  }
}
async function updateClass (req, res) {
  const singleClass = await Classes.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err) {
      if (err) {
        return res.status(500).json({ err });
      }
      return res
        .status(200)
        .json({ success, msg: "class successfully updated" });
    }
  );
}

async function deleteClass(req, res) {
  const singleClass = await Classes.findById({ _id: req.params.id });
  if (singleClass) {
    await singleClass.remove();
    res.json({ message: "singleClass removed" });
  } else {
    res.status(404);
    throw new Error("singleClass not found");
  }
}

module.exports = {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass
};