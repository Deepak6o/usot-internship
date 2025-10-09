import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("[mongodb] Missing MONGODB_URI env var");
    throw new Error("MONGODB_URI is not set in environment variables");
  }

  // Reuse existing connection in dev to avoid creating multiple connections
  if (mongoose.connection.readyState === 1) {
    console.log("[mongodb] Using existing mongoose connection");
    isConnected = true;
    return;
  }

  try {
    console.log("[mongodb] Connecting to MongoDB...", {
      hasDbName: Boolean(process.env.MONGODB_DB_NAME),
    });
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB_NAME || undefined,
    });
    isConnected = true;
    console.log("[mongodb] Connected");
  } catch (err) {
    console.error("[mongodb] Connection error", err);
    throw err;
  }
}
