import { type WorkoutHistoryLoaderReturn } from "@/utils/loaders";
import { useLoaderData } from "react-router-dom";
import { Button } from "../ui/button";
import NoWorkouts from "./NoWorkouts";
import WorkoutMenu from "./WorkoutMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaRegClock } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import { convertHistoryResponse } from "@/utils/convertHistoryResponse";
import {
  WorkoutResponse,
  type Exercise,
  type WorkoutHistoryResponse,
} from "@/types/workoutTypes";
import { useState } from "react";

interface WorkoutSelectorProps {
  responseWorkoutId: string | null;
  exerciseId: string | null;
  setResposneWorkoutId: (id: string) => void;
  setExerciseId: (id: string) => void;
}

function WorkoutSelector({
  setResposneWorkoutId,
  setExerciseId,
  exerciseId,
  responseWorkoutId,
}: WorkoutSelectorProps) {
  const [workout, setWorkout] = useState<WorkoutResponse | null>(null);

  const { workoutHistory, workouts } =
    useLoaderData() as WorkoutHistoryLoaderReturn;

  const workoutHistoryArray = convertHistoryResponse(workoutHistory);

  const getLastWorkoutName = (workout: WorkoutHistoryResponse[]) => {
    const lastIndex = workout.length - 1;

    return workout[lastIndex].workoutName;
  };

  const setWorkoutWithId = (responseWorkoutId: string) => {
    const workout = workouts.find(
      (workout) => workout._id === responseWorkoutId
    );

    if (workout) {
      setWorkout(workout);
    }
  };

  console.log("Workouts for my user are", workouts);

  console.log("Workouts inside of workout selector are:", workoutHistoryArray);

  return (
    <div className="flex flex-row justify-between mx-3 mt-6">
      {workoutHistoryArray.length === 0 ? <NoWorkouts /> : <WorkoutMenu />}
      <Card className="w-[25%]">
        <CardHeader className="pb-1"></CardHeader>
        <CardContent className="flex flex-row">
          <FaRegClock className="font-extrabold text-3xl self-start" />
          <div className="flex flex-col text-right ml-auto my-auto mt-4">
            <h1 className="text-2xl font-bold text-right mb-4 tracking-wide">
              {workoutHistoryArray.length}
            </h1>
            <CardTitle className="tracking-wide">
              Workouts <span className="text-primary">Logged</span>
            </CardTitle>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[25%]">
        <CardHeader className="pb-1"></CardHeader>
        <CardContent className="flex flex-row">
          <FaRegCalendarAlt className="font-extrabold text-3xl self-start" />
          <div className="flex flex-col text-right ml-auto my-auto mt-4">
            <h1 className="text-2xl font-bold text-right mb-4 tracking-wide">
              {getLastWorkoutName(workoutHistoryArray)}
            </h1>
            <CardTitle className="tracking-wide">
              Most <span className="text-primary">Recent </span>
              Workout
            </CardTitle>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[25%]">
        <CardHeader className="pb-1"></CardHeader>
        <CardContent className="flex flex-row">
          <FaDumbbell className="font-extrabold text-3xl self-start" />
          <div className="flex flex-col text-right ml-auto my-auto">
            <Select
              onValueChange={(value) => {
                setResposneWorkoutId(value);
                setWorkoutWithId(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Workout" />
              </SelectTrigger>
              <SelectContent>
                {workouts.map((workout) => (
                  <SelectItem key={workout._id} value={workout._id}>
                    {workout.workoutName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {responseWorkoutId ? (
              <Select onValueChange={(value) => setExerciseId(value)}>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Select Exercise" />
                </SelectTrigger>
                <SelectContent>
                  {workout?.exercises.map((exercise) => (
                    <SelectItem key={exercise._id} value={exercise._id!}>
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
            <CardTitle className="text-center mt-4 tracking-wide">
              Select <span className="text-primary tracking-wide">Workout</span>
            </CardTitle>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WorkoutSelector;
