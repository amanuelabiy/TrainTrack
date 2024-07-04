import { InferSchemaType, Schema, model } from "mongoose";
import Exercise, { IExercise } from "./Exercise";

interface IWorkout {
  workoutName: string;
  exercises: IExercise[];
  notes?: string;
}

const workoutSchema: Schema<IWorkout> = new Schema(
  {
    workoutName: { type: String, required: true },
    exercises: { type: [Exercise], required: true },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

type Workout = InferSchemaType<typeof workoutSchema>;

export default model<Workout>("Workout", workoutSchema);
export { IWorkout };
