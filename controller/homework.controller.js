const Homework = require("../models/homework.model.js");
require("../models/student.model.js");
require("../models/subject.model.js");
require("../models/teacher.model.js");

const endOfDayfrom = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const format = require("date-fns/format");

async function getAllHomeworks(req, res) {
  const { teacherId } = req.params;
  try {
    const AllHomeworks = await Homework.find({ teacherId })
      .populate("students", "lastName")
      .populate("subject", "name");
    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function getAllHomeworksByTitle(req, res) {
  const { teacherId, title } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      teacher: teacherId,
      title,
    })
      .populate("students", "lastName")
      .populate("subject", "name");
    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function getAllHomeworksBySubjectId(req, res) {
  const { teacherId, subjectId } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      teacher: teacherId,
      subjectId,
    })
      .populate("students", "lastName")
      .populate("subject", "name");

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function getAllHomeworksByType(req, res) {
  const { teacherId, type } = req.params;
  try {
    const AllHomeworks = await Homework.find({ teacher: teacherId, type })
      .populate("students", "lastName")
      .populate("subject", "name");

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function getAllHomeworksByDate(req, res) {
  const { teacherId, date } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      teacher: teacherId,
      createdAt: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDayfrom(new Date(date)),
      },
    })
      .populate("students", "lastName")
      .populate("subject", "name");

    // console.log(format(AllHomeworks[0].createdAt, 'yyyy-MM-dd'));

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function addHomework(req, res) {
  const { title, link, description, type, subject } = req.body;
  const { teacherId } = req.params;
  try {
    const newHomework = await Homework.create({
      title,
      link,
      description,
      type,
      subject,
      teacher: teacherId,
    });
    res.status(200).json({
      message: "success",
      data: newHomework,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben erstellen!",
    });
    console.error(error);
  }
}

async function getOneHomework(req, res) {}

async function deleteHomework(req, res) {
  const id = req.params.id;
  try {
    await Homework.findByIdAndDelete(id);

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgabe löschen!",
    });
    console.error(error);
  }
}

async function updateHomework(req, res) {
  const id = req.params.id;
  try {
    const updatedHomework = await Homework.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    })
      .populate("students", "lastName")
      .populate("subject", "name");
    res.status(200).json({
      message: "success",
      data: updatedHomework,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgabe aktualizieren!",
    });
    console.error(error);
  }
}

module.exports = {
  getAllHomeworks,
  addHomework,
  getOneHomework,
  deleteHomework,
  updateHomework,
  getAllHomeworksByTitle,
  getAllHomeworksBySubjectId,
  getAllHomeworksByType,
  getAllHomeworksByDate,
};
