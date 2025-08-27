import mongoose from "mongoose";
import { mongoUri } from "../utils/constraints.js";

async function connectDB() {
  try {
    await mongoose.connect(mongoUri, { dbName: "spotify" });
    console.log(`✅Connected To MongoDB`);
  } catch (error) {
    console.log(`Error Connection To MongoDb: ${error}`);
    process.exit(1);
  }
}

export default connectDB;
