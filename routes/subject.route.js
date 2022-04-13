const { Router } = require("express");
const {
  createSubject,
  findSubjectById,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../controller/subject.controller");

const subjectRouter = new Router();

subjectRouter.post("/addSubject", createSubject);
subjectRouter.get("/subject", getSubject);
subjectRouter.get("/getSubjectById", findSubjectById);
subjectRouter.put("/updateSubject/:id", updateSubject);
subjectRouter.delete("/removeSubject/:id", deleteSubject);

module.exports = subjectRouter;
