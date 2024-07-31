import { calcWorkoutCompletion } from "@/utils/calcWorkoutCompletion";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { type TodayWorkout } from "./TodayWorkoutCard";
import { LuDumbbell } from "react-icons/lu";
import { Button } from "../ui/button";
import { type Exercise, type WorkingSet } from "@/types/workoutTypes";
import { useState } from "react";
import ExerciseDialog from "./ExerciseDialog";
import { calcExerciseCompletion } from "@/utils/calcExerciseCompletion";

interface InProgressWorkoutProps {
  workout: TodayWorkout;
  handleCancelClick: (cancelWorkout: TodayWorkout) => void;
}

function InProgressWorkout({
  workout,
  handleCancelClick,
}: InProgressWorkoutProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const [displayedWorkout, setDisplayedWorkout] =
    useState<TodayWorkout>(workout);

  console.log(displayedWorkout);

  const handleDialogSaveClick = (
    exercise: Exercise,
    workingSets: WorkingSet[]
  ) => {
    const newDisplayedWorkoutExerciseArray = displayedWorkout.exercises.map(
      (displayedExercise) =>
        displayedExercise._id === exercise._id
          ? { ...displayedExercise, workingSets: workingSets }
          : displayedExercise
    );

    const newExerciseArray = [];

    console.log(
      "The new displayed workout exercise array is",
      newDisplayedWorkoutExerciseArray
    );

    for (const newDisplayedExercise of newDisplayedWorkoutExerciseArray) {
      if (newDisplayedExercise._id === exercise._id) {
        const newExercise = {
          ...newDisplayedExercise,
          workingSets: newDisplayedExercise.workingSets,
        };
        newExerciseArray.push(newExercise);
      } else {
        newExerciseArray.push(newDisplayedExercise);
      }
    }

    console.log("The new exercise array is", newExerciseArray);

    setDisplayedWorkout({ ...displayedWorkout, exercises: newExerciseArray });
  };

  return (
    <div>
      <h1 className="ml-[8px]">{displayedWorkout.workoutName}</h1>
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
                <Progress value={calcExerciseCompletion(exercise)} />
              </div>
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
            onClick={() => handleCancelClick(displayedWorkout)}
          >
            Cancel Workout
          </Button>
          <Button className="align-center w-56">Save Workout</Button>
        </div>
      </Card>
      {selectedExercise && (
        <ExerciseDialog
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          exercise={selectedExercise}
          workout={displayedWorkout}
          handleDialogSaveClick={handleDialogSaveClick}
        />
      )}
    </div>
  );
}

export default InProgressWorkout;
