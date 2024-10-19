// Importing mongoose library and types
import mongoose, { Connection } from "mongoose";
// Declaring a variable to store the cached database connection
let cachedConnection= null;

// Function to establish a connection to MongoDB
export async function connectToMongoDB() {
  // If a cached connection exists, return it
  if (cachedConnection) {
    console.log("데이터베이스 이미 연결됨");
    return cachedConnection;
  }

  try {
    // MongoDB connection options with timeouts
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 서버 선택 타임아웃 (10초)
      socketTimeoutMS: 60000,          // 소켓 타임아웃 (60초)
    };

    // Establish a new connection to MongoDB
    const cnx = await mongoose.connect(process.env.MONGODB_URI );

    // Cache the connection for future reuse
    cachedConnection = cnx.connection;

    // Log message indicating a new MongoDB connection is established
    console.log("새로운 MongoDB 연결 설정됨");

    // Return the cached connection
    return cachedConnection;
  } catch (error) {
    // If an error occurs, log and throw it
    console.error("MongoDB 연결 오류:", error);
    throw error;
  }
}
