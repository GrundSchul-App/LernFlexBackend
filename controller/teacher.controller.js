const Subject = require("../models/subject.model");
const Teacher = require("../models/teacher.model");
require("../models/class.model");

async function createTeacher(req, res) {
  const { firstName, lastName, email, modules } = req.body;

  //   console.log(req.body);

  const checkTeacher = await Teacher.findOne({ email: email });
  // const checkTeacherLastName = await Teacher.findOne({ lastName: lastName });

  if (checkTeacher) {
    res.status(400).send("Teacher already exists");
    return;
  }
  try {
    const neuTeacher = await Teacher.create({
      firstName,
      lastName,
      email,
      modules,
     
    });
    res.status(200).json({
      message: "created",
      data: neuTeacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei  create neu Teacher!",
    });
    console.error(error);
  }

  //   res.status(201).send("created");
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send(error);
  // }
}

async function getTeacher(req, res, next) {
  try {
    const Teachers = await Teacher.find({})
      .populate("modules.classes")
      .populate("modules.subjects")
      .populate("students");
    res.status(200).json({ message: "success", data: Teachers });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function findTeacherById(req, res) {
  const id = req.params.id;
  try {
    const teacher = await Teacher.find({ _id: id })
      .populate("classes")
      .populate("subjects")
      .populate("students");
    //   res.json(teacher);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send(error);
    // }
    res.status(200).json({
      message: "success",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Teacher Wiedergabe!",
    });
    console.error(error);
  }
}

async function findTeacherByClass(req, res) {
  const params = req.params.classId;
  try {
    const allTeacher = await Teacher.find({
      classes: { $elemMatch: { $eq: params } },
    }).populate("classes", "className");
    // .populate({path:'Subject', select :'subject_code'}).populate({path:'Classes', select:'className'});
    // res.json(allTeacher);
    res.status(200).json({
      message: "success",
      data: allTeacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Teacher Wiedergabe!",
    });
    console.error(error);
  }
}

async function findTeacherBySubject(req, res) {
  const params = req.params.subject_codeId;
  // console.log(params)
  try {
    const allSubject = await Teacher.find({
      subjects: { $elemMatch: { $eq: params } },
    })
      .populate("subjects", "subject_code")
      .populate("classes", "className")
      .populate("students");
    //  console.log(allSubject);
    // res.json(allSubject);
    res.status(200).json({
      message: "success",
      data: allSubject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Absendheitlisten Wiedergabe!",
    });
    console.error(error);
  }
}

async function findTeacherByClassAndSubject(req, res) {
  const { classId, subjectId } = req.params;
  // console.log(params)
  try {
    const allSubject = await Teacher.find({
      modules: { $elemMatch: { classes: classId, subjects: subjectId } },
      //  modules: { $elemMatch: { subjects: subjectId } },
    }).populate(["modules.classes", "modules.subjects"]);

    //  console.log(allSubject);
    // res.json(allSubject);
    res.status(200).json({
      message: "success",
      data: allSubject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Lehrer suchen!",
    });
    console.error(error);
  }
}

async function findTeacherAndSubjectsByClassId(req, res) {
  const { classId } = req.params;
  // console.log(params)
  try {
    const allTeachers = await Teacher.find({
      modules: { $elemMatch: { classes: classId } },
    })
      .sort({ modules: 1 })
      .populate(["modules.classes", "modules.subjects"]);

    res.status(200).json({
      message: "success",
      data: allTeachers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Lehrer suchen!",
    });
    console.error(error);
  }
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
    const resultTeachers = await Teacher.find({}).populate([
      "modules.classes",
      "modules.subjects",
    ]);
    // .populate("modules.subjects")
    res.status(200).json({
      message: "success",
      data: resultTeachers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Teacher Update!",
    });
    console.error(error);
  }

  //   res.json(teacher);
  // } catch (error) {
  //   console.log(error);
  // }
}
async function deleteTeacher(req, res) {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findByIdAndRemove({ _id: id });
    // res.status(200);
    // res.send("Teacher deleted successfully");
    res.status(200).json({
      message: "success",
      data: teacher,
    });
  } catch (err) {
    return res.status(500).send("Not found with id:  " + id + " - " + err);
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
  findTeacherByClassAndSubject,
  findTeacherAndSubjectsByClassId,
};
