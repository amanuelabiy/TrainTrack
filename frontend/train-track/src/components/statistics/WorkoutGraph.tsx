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
import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";
import { type GraphData } from "@/types/workoutTypes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WorkoutGraphProps {
  responseWorkoutId: string | null;
  exerciseId: string | null;
}

function WorkoutGraph({ responseWorkoutId, exerciseId }: WorkoutGraphProps) {
  const { workoutHistory, workouts } =
    useLoaderData() as WorkoutHistoryLoaderReturn;
  const workoutHistoryArray = useMemo(
    () => convertHistoryResponse(workoutHistory),
    [workoutHistory]
  );

  const isDarkMode = useAppSelector(
    (state) => state.themeState.theme === "dark"
  );

  const getExerciseData = useCallback(
    (responseWorkoutId: string, exerciseId: string) => {
      const matchingWorkouts = workoutHistoryArray
        .map((workout) =>
          workout.workoutId === responseWorkoutId ? workout : null
        )
        .filter((workout) => workout !== null);

      const labels = matchingWorkouts.map((workout) => {
        const date = new Date(workout.createdAt);

        const formattedDate = date.toLocaleDateString("en-US", {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
        });

        return formattedDate;
      });

      const allExercises = matchingWorkouts
        .map((workout) => workout.exercises)
        .flat();

      const matchingExercises = allExercises
        .map((exercise) => (exercise._id === exerciseId ? exercise : null))
        .filter((exercise) => exercise !== null);

      let exerciseName = "";

      for (const exercise of matchingExercises) {
        exerciseName = exercise.name;
      }

      const workingSetAverages = matchingExercises.map((exercise) => {
        if (exercise.workingSets && exercise.workingSets.length > 0) {
          let counter = 0;
          let totalWeight = 0;

          for (const workingSet of exercise.workingSets) {
            counter++;
            totalWeight += workingSet.weight;
          }

          const averageWeightForSet = totalWeight / counter;
          return averageWeightForSet;
        } else {
          return 0;
        }
      });

      return {
        data: workingSetAverages,
        labels: labels,
        exerciseName: exerciseName,
      };
    },
    [workoutHistoryArray]
  );

  const [data, setData] = useState<GraphData>({
    labels: [""],
    datasets: [
      {
        label: "No data Available",
        data: [0],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "#FFFFFF",
        borderWidth: 4,
      },
    ],
  });

  useEffect(() => {
    if (exerciseId && responseWorkoutId) {
      const { data, labels, exerciseName } = getExerciseData(
        responseWorkoutId,
        exerciseId
      );

      setData({
        labels: labels,
        datasets: [
          {
            label: exerciseName,
            data: data,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "#FFFFFF",
            borderWidth: 4,
          },
        ],
      });
    }
  }, [responseWorkoutId, exerciseId, getExerciseData]);

  const options = {
    layout: {
      padding: 20,
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#FFFFFF" : "#000000", // Light color for dark mode, dark color for light mode
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#FFFFFF" : "#000000", // Light color for dark mode, dark color for light mode
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#FFFFFF" : "#000000", // Adjust the legend text color
        },
      },
    },
  };

  console.log("Is dark mode", isDarkMode);

  return (
    <div className="w-[100vh] mx-auto mt-10">
      <Line options={options} data={data}></Line>
    </div>
  );
}

export default WorkoutGraph;
