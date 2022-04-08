const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const connect = require('./db/connect');
require('dotenv').config();
const studentRouter = require('./routes/student.routes');
const User = require('./models/user');

app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/students", studentRouter);


const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => console.log("The server is listening on port", port));
  } catch (err) {
    console.log(err);
  }
}

start();
