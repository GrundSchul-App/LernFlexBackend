const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

const connect = require("./db/connect");
require("dotenv").config();

const routeTeacher = require("./routes/teacher.route");
const routerSubject = require("./routes/subject.route");
const routerteacherAndSubject = require("./routes/teacher.subject.route");
const studentRouter = require("./routes/student.routes");

const homeworkRouter = require("./routes/homework.routes");
const attendanceListRouter = require("./routes/attendanceList.routes");
const classesRouter = require('./routes/classes.routes');



app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.use(routerteacherAndSubject);
app.use("/", routerSubject);
app.use("/", routeTeacher);

app.use("/students", studentRouter);
app.use("/homeworks", homeworkRouter);
app.use("/attendanceList", attendanceListRouter);
app.use("/classes", classesRouter);


const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log("The server is listening on port", port)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
