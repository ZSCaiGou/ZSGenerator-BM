import mongoose from "mongoose";
import config from "./index.js";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.database.url, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.fatal({ err: error }, "MongoDB connection failed");
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

export default connectDB;
