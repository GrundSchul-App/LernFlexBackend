const Student = require("../models/student.model");

async function getStudents(req, res) {
  try {
    const students = await Student.find({});
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
  const student = await Student.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err) {
      if (err) {
        return res.status(500).json({ err });
      }
      return res
        .status(200)
        .json({ success, msg: "student successfully updated" });
    }
  );
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
