const {Router}=require('express')
const {getSubject}=require("../controller/subject.controller")
const {getTeacher}=require("../controller/teacher.controller")
// const {getSubjectAndTeacher}=require("../controller/teacher.subject.controller")

teacherSubjectRouter= new Router();

teacherSubjectRouter.get("/teacherAndSubject",getSubject,getTeacher);


module.exports=teacherSubjectRouter;