import { IExercise } from "models/Exercise";
import mongoose, { Types } from "mongoose";

export enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export interface WorkoutData {
  _id?: Types.ObjectId;
  workoutName: string;
  exercises: IExercise[];
  day: Day;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isEditing?: boolean;
}
