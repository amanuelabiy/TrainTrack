import { calcWorkoutCompletion } from "@/utils/calcWorkoutCompletion";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { LuDumbbell } from "react-icons/lu";
import { Button } from "../ui/button";
import { type Exercise } from "@/types/workoutTypes";
import { useState } from "react";
import ExerciseDialog from "./ExerciseDialog";
import { calcExerciseCompletion } from "@/utils/calcExerciseCompletion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import {
  endTodaysWorkout,
  handleInProgressSaveClick,
} from "@/features/todaysWorkout/todaysWorkoutSlice";

function InProgressWorkout() {
  const dispatch = useAppDispatch();
  const displayedWorkout = useAppSelector(
    (state: RootState) => state.todaysWorkoutState.startedWorkout
  );

  console.log("The current todaysworkout state is", displayedWorkout);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const handleSaveClick = async () => {
    await dispatch(handleInProgressSaveClick());
  };

  if (!displayedWorkout) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="flex">
        <h1 className="ml-[8px]">{displayedWorkout.workoutName}</h1>
      </div>
      <Card className="w-[90%] h-[600px] border-none flex flex-col justify-between bg-transparent">
        <CardContent className="flex-items aspect-video items-center justify-center p-3">
          {displayedWorkout.exercises.map((exercise, index) => (
            <div
              className={`flex items-center gap-10 p-3 transition-colors duration-300 ease-in-out ${
                index === 0 ? "" : "mt-5"
              } hover:bg-secondary hover:border hover:border-gray-300 hover:cursor-pointer`}
              key={exercise._id}
              onClick={() => setSelectedExercise(exercise)}
            >
              <LuDumbbell className="w-8 h-8" />
              <div className="flex flex-col">
                <p className="font-bold">{exercise.name}</p>
                <p className="text-sm">
                  {exercise.sets} sets of {exercise.reps} reps
                </p>
              </div>
              <Progress
                value={calcExerciseCompletion(exercise)}
                className="h-[5px] w-[50%] ml-auto"
              />
            </div>
          ))}
        </CardContent>
        <div className="flex flex-col items-center my-[60px]">
          <label className="font-bold mr-auto mb-3">
            {calcWorkoutCompletion(displayedWorkout)}% Completed
          </label>
          <Progress
            value={calcWorkoutCompletion(displayedWorkout)}
            className="w-full h-[5px]"
          />
        </div>
        <div className="flex justify-center gap-4 mb-10">
          <Button
            variant="outline"
            className="align-center w-56"
            onClick={() => {
              dispatch(endTodaysWorkout(displayedWorkout));
            }}
          >
            Cancel Workout
          </Button>
          <Button className="align-center w-56" onClick={handleSaveClick}>
            Save Workout
          </Button>
        </div>
      </Card>
      {selectedExercise && (
        <ExerciseDialog
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          exercise={selectedExercise}
          workout={displayedWorkout}
        />
      )}
    </div>
  );
}

export default InProgressWorkout;
