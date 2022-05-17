const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const connect = require("./db/connect");
require("dotenv").config();
const loginRouter = require("./routes/authRoutes.routes");
const registerRouter = require("./routes/user.routes");

const userRouter = require("./routes/user.routes");
const logoutUser = require("./routes/authRoutes.routes");
const { loginUser } = require("./controller/user.controller");

const routeTeacher = require("./routes/teacher.route");
const routerSubject = require("./routes/subject.route");
const routerteacherAndSubject = require("./routes/teacher.subject.route");
const studentRouter = require("./routes/student.routes");

const { authUser } = require("./middlewares/auth");
const { authAdmin } = require("./middlewares/admin");

const homeworkRouter = require("./routes/homework.routes");
const attendanceListRouter = require("./routes/attendanceList.routes");
const classesRouter = require("./routes/classes.routes");
const calEventsRouter = require("./routes/calEvent.routes");
const remoteWeekRouter = require("./routes/remoteWeek.routes");

app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_KEY));

app.get("/api/v1", (req, res) => {
  console.log(req.cookies);
  res.send("hello world");
});

app.use('/',loginRouter);
app.use('/users', registerRouter);
app.use(logoutUser);
app.use(routerteacherAndSubject);
// app.use("/users/login", loginUser);

// app.use(authUser);

app.use("/", routerSubject);
app.use("/", routeTeacher);
app.use("/users", userRouter);
app.use("/students", studentRouter);
app.use("/homeworks", homeworkRouter);
app.use("/attendanceList", attendanceListRouter);
app.use("/classes", classesRouter);
app.use("/calendar", calEventsRouter);
app.use("/remoteWeek", remoteWeekRouter);

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
