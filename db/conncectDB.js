import mongoose from "mongoose";
import {} from "dotenv/config";


export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to database');
  } catch (err) {
    console.log(err);
  }
}

