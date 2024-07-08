import { InferSchemaType, Schema, Types, model } from "mongoose";

interface IWorkout {
  workoutName: string;
  exercises: Types.ObjectId[];
  notes?: string;
}

const workoutSchema: Schema<IWorkout> = new Schema(
  {
    workoutName: { type: String, required: true },
    exercises: [
      { type: Schema.Types.ObjectId, ref: "Exercise", required: false },
    ],
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

type Workout = InferSchemaType<typeof workoutSchema>;

export default model<Workout>("Workout", workoutSchema);
export { IWorkout };
