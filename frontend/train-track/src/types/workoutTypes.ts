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

export interface GraphDataSets {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
}

export interface GraphData {
  labels: string[];
  datasets: GraphDataSets[];
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

// console.log("Match Workouts are", matchingWorkouts);

// const allExercises = matchingWorkouts
//   .map((workout) => workout.exercises)
//   .flat();

// const matchingExercises = allExercises
//   .map((exercise) =>
//     exercise._id === "66c383e4f6e78481dccb39c2" ? exercise : null
//   )
//   .filter((exercise) => exercise !== null);

// const workingSetAverages = matchingExercises.map((exercise) => {
//   if (exercise.workingSets && exercise.workingSets.length > 0) {
//     let counter = 0;
//     let totalWeight = 0;

//     for (const workingSet of exercise.workingSets) {
//       counter++;
//       totalWeight += workingSet.weight;
//     }

//     const averageWeightForSet = totalWeight / counter;
//     return averageWeightForSet;
//   } else {
//     return 0;
//   }
// });

// console.log("WorkingSet averages", workingSetAverages);

// console.log("all exercises", allExercises);

// console.log("matching Exercises", matchingExercises);

// const data = {
//   labels: [], // Empty array for labels
//   datasets: [
//     {
//       label: "Empty Dataset",
//       data: [], // Empty array for data
//       borderColor: "rgba(75,192,192,1)",
//       borderWidth: 2,
//       fill: false,
//     },
//   ],
// };

// const matchingWorkouts = workoutHistoryArray.map((workout) =>
//   workout.workoutId === workoutHistoryArray[2].workoutId ? workout : null
// );

// const filteredMatchingWorkouts = matchingWorkouts.filter(
//   (workout) => workout !== null
// );

// const labels = filteredMatchingWorkouts.map((workout) => {
//   const date = new Date(workout.createdAt);

//   const formattedDate = date.toLocaleDateString("en-US", {
//     year: "2-digit",
//     month: "numeric",
//     day: "numeric",
//   });

//   return formattedDate;
// });

// const dataSet = filteredMatchingWorkouts.

// console.log("Filtered Matching workouts are", filteredMatchingWorkouts);
// console.log("labels are", labels);

// const getDataForWorkout = (resposneWorkoutId: string) => {
//   // The Id is not the workoutId it is the normal id for the user's workout's array

//   const matchingWorkouts = workoutHistoryArray.map((workout) =>
//     workout.workoutId === resposneWorkoutId ? workout : null
//   );

//   const filteredMatchingWorkouts = matchingWorkouts.filter(
//     (workout) => workout !== null
//   );

//   const labels = filteredMatchingWorkouts.map((workout) => {
//     const date = new Date(workout.createdAt);

//     const formattedDate = date.toLocaleDateString("en-US", {
//       year: "2-digit",
//       month: "numeric",
//       day: "numeric",
//     });

//     return formattedDate;
//   });

//   const lineChartData = {
//     labels: labels,
//     dataSets: [],
//   };
// };
