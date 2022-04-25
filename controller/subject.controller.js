const Subject = require("../models/subject.model");

async function createSubject(req, res) {
  const { subject_code, subject_title } = req.body;

  const checkSubject = await Subject.findOne({ subject_code: subject_code });
  if (checkSubject) {
    res.status(400).json({
      message: "Fach existiert bereits!",
    });
    return;
  }
  try {
    await Subject.create({ subject_code, subject_title });
    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei  create neu subject!",
    });
    console.error(error);
    // console.error(error);
    // res.status(500).send(error);
  }
}

async function getSubject(req, res, next) {
  Subject.find({}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Fehler bei Subject Wiedergabe!",
      });
      console.error(error);
    } else {
      res.status(200).json({message: "success", data: result});
    }
    //   res.send(err);
    // } else {
    //   res.send(result);
    // }
  });
}

async function findSubjectById(req, res) {
  const id = req.params.id;
  try {
    const subject = await Subject.findById({ _id: id });

    res.status(200).json({
      message: "success",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei suche subject mit ID !",
    });
    console.error(error);
  }
  //   res, json(subject);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send(error);
  // }
}

async function updateSubject(req, res) {
  try {
    const id = req.params.id;
    const subject = await Subject.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.status(200).json({
      message: "success",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Subject Update!",
    });
    console.error(error);
  }

  //   res.json(subject);
  // }catch (error) {
  //   console.log(error)
  // }
}

async function deleteSubject(req, res) {
  const id = req.params.id;
  try {
    const subject = await Subject.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "success"});
   
  } catch (error) {
    return res.status(500).send("Not found with id:  " + id + " - " + err);
  }
}

module.exports = {
  createSubject,
  findSubjectById,
  getSubject,
  updateSubject,
  deleteSubject,
};
