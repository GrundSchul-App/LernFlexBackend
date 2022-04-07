const Teacher = require("../models/teacher.model");

async function createTeacher(req, res) {
  const { firstName, lastName, email } = req.body;
  //   console.log(req.body);

  const checkTeacher = await Teacher.findOne({ email: email });
  const checkTeacherLastName = await Teacher.findOne({ lastName: lastName });

  if (checkTeacher && checkTeacherLastName) {
    res.status(400).send("Teacher already exists");
    return;
  }
  try {
    await Teacher.create({ firstName, lastName, email });
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
  });
}



async function findTeacherById(req, res) {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findById({ _id: id });
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}


async function updateTeacher(req, res) {
  try{
    const id= req.params.id;
    const teacher=await Teacher.findOneAndUpdate(id, req.body,{
      new:true,
      runValidators:true,
      context:"query"
    })
    res.json(teacher);
  }catch(error) {
    console.log(error)
  }
}
async function deleteTeacher(req, res) {
  const id= req.params.id;
  try{
    const teacher= await Teacher.deleteOne({_id:id})
    res.status(200);
    res.send('Teacher deleted successfully')
  }catch(err) {
    return res.status(400).send("Not found with id:  " + id  + " - " + err)

  }
}


module.exports = { createTeacher, findTeacherById, getTeacher ,updateTeacher,deleteTeacher};
