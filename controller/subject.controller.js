const Subject = require("../models/subject.model");

async function createSubject(req, res) {
  const { subject_code, subject_title } = req.body;

  const checkSubject = await Subject.findOne({ subject_code: subject_code });
  if (checkSubject) {
    res.status(400).send("Subject already exists");
    return;
  }
  try {
    await Subject.create({ subject_code, subject_title });
    res.status(201).send("created");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function getSubject(req, res) {
  Subject.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

async function findSubjectById(req, res) {
  const id = req.params.id;
  try {
    const subject = await Subject.findById({ _id: id });
    res, json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = { createSubject, findSubjectById, getSubject };
