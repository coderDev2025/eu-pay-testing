import app from "./server.js";
import env from "dotenv";
env.config();
import connectDB from "./config/db.config.js";
import { partnerLogin } from "./services/linkcy.service.js";

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    await connectDB();
    console.log("✅ Database connected");

    await partnerLogin(); // ⏳ Ensure partner is logged in before server starts
    console.log("✅ Partner logged in");

    app.listen(port, () => {
      console.log(`🚀 App is listening on port ${port}`);
    });

  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1); // Exit if something critical fails
  }
}

startServer();
