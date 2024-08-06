import mongoose, { InferSchemaType, Schema, Types, model } from "mongoose";
import { Day } from "../types/types";

interface IWorkout {
  _id?: Types.ObjectId;
  workoutName: string;
  exercises: Types.ObjectId[];
  day: Day;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
  isEditing?: boolean;
  userId: mongoose.Types.ObjectId;
}

export const workoutSchema: Schema<IWorkout> = new Schema(
  {
    workoutName: { type: String, required: true },
    exercises: [
      { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    ],
    day: { type: String, enum: Object.values(Day), required: true },
    notes: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

type Workout = InferSchemaType<typeof workoutSchema>;

export default model<Workout>("Workout", workoutSchema);
export { IWorkout };
