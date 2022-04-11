const Teacher = require("../models/teacher.model");
require("../models/class.model")

async function createTeacher(req, res) {
  const { firstName, lastName, email, classes, subjects, students } = req.body;
  //   console.log(req.body);

  const checkTeacher = await Teacher.findOne({ email: email });
  // const checkTeacherLastName = await Teacher.findOne({ lastName: lastName });

  if (checkTeacher) {
    res.status(400).send("Teacher already exists");
    return;
  }
  try {
    await Teacher.create({
      firstName,
      lastName,
      email,
      classes,
      subjects,
      students,
    });
    res.status(201).send("created");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function getTeacher(req, res) {
  Teacher.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).populate("classes")
    .populate("subjects", "subject_code")
    .populate("students")
  ;
}

async function findTeacherById(req, res) {
  const id = req.params.id;
  try {
    const teacher = await Teacher.find({ _id: id });
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function findTeacherByClass(req, res) {
  const params = req.params.classId;

  const allTeacher = await Teacher.find({
    classes: { $elemMatch: { $eq: params } },
  }).populate('classes','className')
  // .populate({path:'Subject', select :'subject_code'}).populate({path:'Classes', select:'className'});
  res.json(allTeacher);
}

async function findTeacherBySubject(req, res) {
  const params = req.params.subject_codeId;
  // console.log(params)

  const allSubject = await Teacher.find({
    subjects: { $elemMatch: { $eq: params } },
  }).populate("subjects", "subject_code");
  // .populate('classes','className')

  console.log(allSubject);
  res.json(allSubject);
}

async function sortTeacherByFirstName(req, res) {
  // db.Collection_name.sort({field_name : 1 ou -1})
  const sortResult = await Teacher.find().sort({ firstName: -1 });

  res.json(sortResult);
}

async function updateTeacher(req, res) {
  try {
    const id = req.params.id;
    // console.log('resultat:', req.body)
    const teacher = await Teacher.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    res.json(teacher);
  } catch (error) {
    console.log(error);
  }
}
async function deleteTeacher(req, res) {
  const id = req.params.id;
  try {
    const teacher = await Teacher.deleteOne({ _id: id });
    res.status(200);
    res.send("Teacher deleted successfully");
  } catch (err) {
    return res.status(400).send("Not found with id:  " + id + " - " + err);
  }
}

module.exports = {
  createTeacher,
  findTeacherById,
  getTeacher,
  updateTeacher,
  sortTeacherByFirstName,
  deleteTeacher,
  findTeacherBySubject,
  findTeacherByClass,
};
