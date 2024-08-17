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

export interface WorkoutHistoryResponse extends WorkoutResponse {
  workoutId: string;
  userId: string;
}

export interface HistoryResponse {
  _id: string;
  workouts: WorkoutHistoryResponse[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UpdatedWorkout extends Workout {
  _id: string;
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
