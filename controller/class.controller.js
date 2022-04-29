const Classes = require("../models/class.model");
require("../models/student.model");
require("../models/teacher.model");
require("../models/subject.model");

async function getClasses(req, res) {
  try {
    const classes = await Classes.find({})
      .sort({ className: 1 })
      
    res.status(200).json({ message: "success", data: classes });
    //classes, totalClasses: classes.length});
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getClass(req, res) {
  try {
    const singleClass = await Classes.findOne({ _id: req.params.id });
    res.status(200).json({ singleClass });
  } catch (error) {
    res.status(500).json({ error });
  }
}


// brauchen wir nicht
async function getClassByClassTeacherId(req, res) {
  const { classTeacher } = req.params;
  try {
    const allClasses = await Classes.find({
      classTeacher: classTeacher,
    })
      .sort({ className: 1 })
      .populate("classTeacher")
      .populate("modules.teacher")
      .populate("modules.subject");

    res.status(200).json({
      message: "success",
      data: allClasses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Klassenlist Wiedergabe!",
    });
    console.error(error);
  }
}

// brauchen wir nicht
async function getClassByModule(req, res) {
  const { subjectId, teacherId } = req.params;
  // console.log(params)
  try {
    const allClasses = await Classes.find({     
       modules: { $elemMatch: { subject: subjectId, teacher: teacherId  } },
     
    }).sort({ className: 1 })
    .populate("classTeacher")
    .populate("modules.teacher")
    .populate("modules.subject");
     
    
    res.status(200).json({
      message: "success",
      data: allClasses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Classes bei Module suchen!",
    });
    console.error(error);
  }
}

async function createClass(req, res) {
  try {
    const newClass = await Classes.create(req.body);
    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Klassen Erstellung!",
    });
  }
}

/* async function updateClass(req, res) {
  const singleClass = await Classes.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "Fehler bei Klasse Aktualisierung",
        });
      }
      return res.status(200).json({
        message: "success",
        data: singleClass
      });
    }
  );
} */

async function updateClass(req, res) {
  try {
    const id = req.params.id;
    const updatedClass = await Classes.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.status(200).json({
      message: "success",
      data: updatedClass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Class Update!",
    });
    console.error(error);
  }
}

async function deleteClass(req, res) {
  const singleClass = await Classes.findById({ _id: req.params.id });
  if (singleClass) {
    await singleClass.remove();
    res.status(200).json({ message: "success" });
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
  deleteClass,
  getClassByClassTeacherId,
  getClassByModule,
};
