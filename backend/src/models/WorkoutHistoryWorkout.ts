import mongoose, { Schema, Types } from "mongoose";
import { Day } from "../types/types";
import {
  IWorkoutHistoryExercise,
  workoutHistoryExerciseSchema,
} from "./WorkoutHistoryExercise";

interface IWorkoutHistoryWorkout {
  _id?: Types.ObjectId;
  workoutId?: Types.ObjectId;
  workoutName: string;
  exercises: IWorkoutHistoryExercise[];
  day: Day;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  userId: mongoose.Types.ObjectId;
}

const workoutHistoryWorkoutSchema: Schema<IWorkoutHistoryWorkout> = new Schema(
  {
    workoutId: { type: Types.ObjectId, required: false },
    workoutName: { type: String, required: true },
    exercises: [workoutHistoryExerciseSchema],
    day: { type: String, enum: Object.values(Day), required: true },
    notes: { type: String, required: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export { IWorkoutHistoryWorkout, workoutHistoryWorkoutSchema };
