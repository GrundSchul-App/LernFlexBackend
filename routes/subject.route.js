const { Router } = require("express");
const {
  createSubject,
  findSubjectById,
  getSubject,
} = require("../controller/subject.controller");

const subjectRouter = new Router();


subjectRouter.post("/addSubject", createSubject);
subjectRouter.get("/subject", getSubject);
subjectRouter.get("/getSubjectById", findSubjectById);

module.exports = subjectRouter;
