export interface Workout {
  workoutName: string;
  exercises: Exercise[];
  day: Day;
  notes?: string;
}

export interface WorkingSet {
  weight: number;
  reps: number;
  completed: boolean;
}

export interface Exercise {
  _id?: string;
  workoutName: string;
  name: string;
  sets: number;
  reps: number;
  workingSets?: WorkingSet[];
  notes?: string;
  completed?: boolean;
  __v?: number;
}

export type AllWorkoutReponse = {
  data: WorkoutResponse[];
};

export interface WorkoutResponse {
  _id: string;
  workoutName: string;
  exercises: Exercise[];
  day: Day;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isEditing?: boolean;
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
