const Student = require("../models/student.model");
require("../models/teacher.model.js");
require("../models/class.model");
require("../models/homework.model");

async function getStudents(req, res) {
  try {
    const students =  await Student.find({})
      .populate("classId")
      .populate("teachers")
      .populate("homeworks");
    res.status(200).json({ 
      message: "Success",
      data: students,
      totalStudents: students.length });
  } catch (err) {
    res.status(500).json({ 
      message: 'Fehler bei Teacher Wiedergabee' 
    });
    console.log(error);
  }
}



async function getStudentsByClassId(req, res) {
  const { classId } = req.params;
  try {
    const AllStudents = await Student.find({
      classId: classId    
    }).sort({ lastName: 1 });   

    res.status(200).json({
      message: "success",
      data: AllStudents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Klassenlist Wiedergabe!",
    });
    console.error(error);
  }
}


async function getStudent(req, res) {
  const student = await Student.findOne({ _id: req.params.id });
  res.status(200).json({ student, msg: "Gefunden" });
}

async function createStudent(req, res) {

  const { firstName, lastName, email,gender,birthDate,classId } = req.body;

  try {
    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      classId
    });
    res
      .status(201)
      .json({ 
        data:newStudent,
        message:  "Student successfully created" });
  } catch (err) {
    res.status(500).json({
      message: "Fehler bei  create neu Student!",});
  }
}

async function updateStudent(req, res) {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true, context: "query" }
    );
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
  const student = await Student.findById({ _id: req.params.id });
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
  deleteStudent,
  getStudentsByClassId
};
