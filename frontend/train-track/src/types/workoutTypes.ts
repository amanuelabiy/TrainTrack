export interface Workout {
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

export interface WorkoutState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

export interface WorkoutPlan {
  _id: string;
  name: string;
  description: string;
  workouts: Workout[];
}

export interface WorkoutPlanState {
  workoutPlans: WorkoutPlan[];
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
