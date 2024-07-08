import { InferSchemaType, Schema, Types, model } from "mongoose";

interface IWorkoutSplit {
  _id?: Types.ObjectId;
  name: string;
  workouts: Types.ObjectId[];
}

const workoutSplitSchema: Schema<IWorkoutSplit> = new Schema(
  {
    name: { type: String, required: true },
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout", required: true }],
  },
  { timestamps: true }
);

type WorkoutSplit = InferSchemaType<typeof workoutSplitSchema>;

export default model<WorkoutSplit>("WorkoutSplit", workoutSplitSchema);

export { IWorkoutSplit };
