import mongoose, { InferSchemaType, model, Schema, Types } from "mongoose";
import { IWorkout } from "./Workout";
import { workoutSchema } from "./Workout";
import {
  IWorkoutHistoryWorkout,
  workoutHistoryWorkoutSchema,
} from "./WorkoutHistoryWorkout";

interface IWorkoutHistory {
  _id?: Types.ObjectId;
  workouts: IWorkoutHistoryWorkout[];
  createdAt?: string;
  updatedAt?: string;
  _v: number;
  userId: mongoose.Types.ObjectId;
}

const workoutHistorySchema: Schema<IWorkoutHistory> = new Schema(
  {
    workouts: [workoutHistoryWorkoutSchema],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

type WorkoutHistory = InferSchemaType<typeof workoutHistorySchema>;

export default model<WorkoutHistory>("WorkoutHistory", workoutHistorySchema);
export { IWorkoutHistory };
