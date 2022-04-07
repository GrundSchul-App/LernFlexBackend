const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const connect = require("./db/connect");
require("dotenv").config();
const routeTeacher = require("./routes/teacher.route");


// app.get("/", (req, res) => {
//   res.send("hello world");
// });
app.use(express.json());
app.use("/", routeTeacher);

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
