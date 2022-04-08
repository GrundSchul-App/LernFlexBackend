const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');


router.get('/', async (req, res) => {
  const students = await Student.find({});
  res.status(200).json({student, totalStudents: students.length});
});

router.post("/", async (req, res) => {
  
  try {
    const student = await Student.create(req.body);
    res.status(201).json({student});
  } catch (err) {
    res.status(500).json({msg: err.errors})
  }
  
});

module.exports = router;