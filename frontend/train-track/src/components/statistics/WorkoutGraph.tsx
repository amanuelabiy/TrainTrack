import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { convertHistoryResponse } from "@/utils/convertHistoryResponse";
import { useLoaderData } from "react-router-dom";
import { WorkoutHistoryLoaderReturn } from "@/utils/loaders";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WorkoutGraph() {
  const { workoutHistory, workouts } =
    useLoaderData() as WorkoutHistoryLoaderReturn;
  const workoutHistoryArray = convertHistoryResponse(workoutHistory);

  console.log("Workout History is", workoutHistoryArray);
  console.log("Workouts are", workouts);
  return <div></div>;
}

export default WorkoutGraph;
