import { Schema, model, Document } from "mongoose";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

interface Workout extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  name: string;
  exercises: Exercise[];
  duration: number;
  notes?: string;
}

const ExerciseSchema = new Schema<Exercise>({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  notes: { type: String },
});

const WorkoutSchema = new Schema<Workout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now, required: true },
    name: { type: String, required: true },
    exercises: { type: [ExerciseSchema], required: true },
    duration: { type: Number, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const Workout = model<Workout>("Workout, WorkoutSchema");

export default Workout;
