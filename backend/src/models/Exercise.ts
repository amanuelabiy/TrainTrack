import { InferSchemaType, Schema, model } from "mongoose";

interface IExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

const exerciseSchema: Schema<IExercise> = new Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, require: true },
  weight: { type: Number, required: false },
  notes: { type: String, required: false },
});

type Exercise = InferSchemaType<typeof exerciseSchema>;

export default model<Exercise>("Exercise", exerciseSchema);
export { IExercise };
