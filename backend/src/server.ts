import app from "./app";
import connectDB from "./utils/db";
import env from "./utils/validateEnv";

const PORT = env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();
