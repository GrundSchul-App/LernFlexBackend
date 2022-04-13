const Student = require("../models/student.model");
require("../models/teacher.model.js");
require("../models/class.model");
require("../models/homework.model")


async function getStudents(req, res) {
  try {
    const students = await (await Student.find({}).populate("classId").populate("teachers").populate("homeworks"));
    res.status(200).json({ students, totalStudents: students.length });
  } catch (err) {
    res.status(500).json({ err });
  }
}
async function getStudent(req, res) {
  const student = await Student.findOne({_id: req.params.id});
  res.status(200).json({ student, msg: 'Gefunden' });
}

async function createStudent(req, res) {
  try {
    const newStudent = await Student.create(req.body);
    res
      .status(201)
      .json({ newStudent, success: "Student successfully created" });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function updateStudent(req, res) {
  try{ 
  const student = await Student.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true,
      runValidators: true,
      context: "query", });
      res.status(200).json({
        message: "success",
        data: student,
      });
    } catch (error) {
      res.status(500).json({
        message: "Fehler bei Teacher Update!",
      });
      console.error(error);
    }
}

async function deleteStudent(req, res) {
    const student = await Student.findById({_id: req.params.id});
    if (student) {
      await student.remove();
      res.json({ message: "Student removed" });
    } else {
      res.status(404);
      throw new Error("student not found");
    }

}

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
