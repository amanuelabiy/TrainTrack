export interface Workout {
  workoutName: string;
  exercises: Exercise[];
  day: Day;
  notes?: string;
}

export interface WorkoutState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

export interface Exercise {
  workoutName: string;
  name: string;
  sets: number;
  reps: number;
  note?: string;
}

export interface WorkoutPlan {
  _id: string;
  name: string;
  description: string;
  workouts: Workout[];
}

export interface WorkoutPlanState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

export interface ProgressRecord {
  data: string;
  exercise: string;
  weight: number;
  reps: number;
}

export interface ProgressState {
  progressData: ProgressRecord[];
  loading: boolean;
  error: string | null;
}

export enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
