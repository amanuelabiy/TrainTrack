import mongoose, { Schema, Types } from "mongoose";
import { WorkingSet } from "../types/types";
import { workingSetSchema } from "./Exercise";

interface IWorkoutHistoryExercise {
  _id?: Types.ObjectId;
  workoutName: string;
  name: string;
  sets: number;
  reps: number;
  workingSets: WorkingSet[];
  notes?: string;
  completed?: boolean;
}

const workoutHistoryExerciseSchema: Schema<IWorkoutHistoryExercise> =
  new Schema({
    workoutName: { type: String, required: true },
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, require: true },
    workingSets: { type: [workingSetSchema], required: false },
    notes: { type: String, required: false },
    completed: { type: Boolean, required: false },
  });

export { IWorkoutHistoryExercise, workoutHistoryExerciseSchema };
