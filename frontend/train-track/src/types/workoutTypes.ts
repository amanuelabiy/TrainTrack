export interface Workout {
  workoutName: string;
  exercises: Exercise[];
  day: Day;
  notes?: string;
}

export interface Exercise {
  workoutName: string;
  name: string;
  sets: number;
  reps: number;
  note?: string;
}

export type AllWorkoutReponse = {
  data: WorkoutResponse[];
};

export interface WorkoutResponse {
  _id: string;
  workoutName: string;
  exercises: ExerciseResponse[];
  day: Day;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ExerciseResponse {
  _id: string;
  workoutName: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
  __v: number;
}

export interface WorkoutPlanState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

export enum Day {
  None = "",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
