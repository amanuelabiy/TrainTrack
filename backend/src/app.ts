import "dotenv/config";
import cors from "cors";
import express from "express";
import exerciseRoutes from "./routes/exercise";
import workoutRoutes from "./routes/workout";
import workoutHistoryRoutes from "./routes/workoutHistory";
import userRoutes from "./routes/user";
import errorHandler from "./middleware/errorHandler";
import morgan from "morgan";
import createHttpError from "http-errors";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/api/users", userRoutes);

app.use("/api/exercises", exerciseRoutes);

app.use("/api/workouts", workoutRoutes);

app.use("/api/workoutHistory", workoutHistoryRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use(errorHandler);

export default app;
