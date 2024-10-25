import mongoose from "mongoose";

export default async function connnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "", {
      dbName: "wizQr",
    });
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (err: Error) => {
      console.log(`Error connecting DB: ${err.message}`);
    });
  } catch (err: any) {
    console.log(`Error connecting DB: ${err.message}`);
  }
}
