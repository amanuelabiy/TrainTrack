import {
  InferSchemaType,
  Schema,
  TypeExpressionOperator,
  Types,
  model,
} from "mongoose";

const workingSetSchema = new Schema(
  {
    weight: { type: Number, required: true },
    reps: { type: Number, required: true },
  },
  { _id: false }
);

interface WorkingSet {
  weight: number;
  reps: number;
}

interface IExercise {
  _id?: Types.ObjectId;
  workoutName: string;
  name: string;
  sets: number;
  reps: number;
  workingSets?: WorkingSet[];
  notes?: string;
  completed?: boolean;
}

const exerciseSchema: Schema<IExercise> = new Schema({
  workoutName: { type: String, required: true },
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, require: true },
  workingSets: { type: [workingSetSchema], required: false },
  notes: { type: String, required: false },
  completed: { type: Boolean, required: false },
});

type Exercise = InferSchemaType<typeof exerciseSchema>;

export default model<Exercise>("Exercise", exerciseSchema);
export { IExercise };
