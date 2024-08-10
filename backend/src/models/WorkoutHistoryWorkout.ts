import mongoose, { Schema, Types } from "mongoose";
import { Day } from "../types/types";
import {
  IWorkoutHistoryExercise,
  workoutHistoryExerciseSchema,
} from "./WorkoutHistoryExercise";

interface IWorkoutHistoryWorkout {
  _id: Types.ObjectId;
  workoutId?: Types.ObjectId;
  workoutName: string;
  exercises: IWorkoutHistoryExercise[];
  day: Day;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isEditing?: boolean;
}

const workoutHistoryWorkoutSchema: Schema<IWorkoutHistoryWorkout> = new Schema(
  {
    workoutId: { type: Types.ObjectId, ref: "Workout", required: false },
    workoutName: { type: String, required: true },
    exercises: [workoutHistoryExerciseSchema],
    day: { type: String, enum: Object.values(Day), required: true },
    notes: { type: String, required: false },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
  },
  { timestamps: true }
);

// workoutHistoryWorkoutSchema.pre("save", function (next) {
//   if (!this.workoutId) {
//     this.workoutId = this._id;
//   }
//   next();
// });

export { IWorkoutHistoryWorkout, workoutHistoryWorkoutSchema };
