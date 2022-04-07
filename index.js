import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import { connectDB } from "./db/conncectDB.js";

app.get('/', (req, res) => {
  res.send('hello world');
})

connectDB();
app.listen(port, () => console.log('The server is listening on port', port));