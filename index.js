const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const connect = require('./db/connect');
require('dotenv').config();

app.get("/", (req, res) => {
  res.send("hello world");
});

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => console.log("The server is listening on port", port));
  } catch (err) {
    console.log(err);
  }
}

start();
