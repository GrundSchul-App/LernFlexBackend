import express from "express";
const app = express();
const port = process.env.PORT || 4000;
import { connect } from "./db/conncect.js";

app.get("/", (req, res) => {
  res.send("hello world");
});

connect();
app.listen(port, () => console.log("The server is listening on port", port));
