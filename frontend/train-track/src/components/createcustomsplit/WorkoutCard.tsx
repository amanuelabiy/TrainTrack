import { type WorkoutResponse } from "@/types/workoutTypes";
import { Button } from "../ui/button";
import { Pencil, Dumbbell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import {
  calcWorkoutCompletion,
  calcWorkoutHasStarted,
} from "@/utils/calcWorkoutCompletion";
import { useState } from "react";
import WorkoutDeletionWarning from "./WorkoutDeletionWarning";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
interface WorkoutCardProps {
  workout: WorkoutResponse;
  handleEditClick: (workout: WorkoutResponse) => void;
  handleDeleteClick: (workout: WorkoutResponse) => void;
}

function WorkoutCard({
  workout,
  handleEditClick,
  handleDeleteClick,
}: WorkoutCardProps) {
  const formatDate = (mongoDate: string) => {
    const date = new Date(mongoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const [showDeletionWarning, setShowDeletionWarning] =
    useState<boolean>(false);

  const handleDelete = () => {
    setShowDeletionWarning(true);
  };

  const handleClose = () => {
    setShowDeletionWarning(false);
  };

  const workoutsForToday = useAppSelector(
    (state: RootState) => state.todaysWorkoutState.workoutsForToday
  );

  const displayedWorkout = useAppSelector(
    (state: RootState) => state.todaysWorkoutState.startedWorkout
  );

  let workoutIsToday = false;
  let workoutHasStarted = false;
  let workoutIsInProgress = false;
  let disableWorkoutEditButton = false;

  if (workoutsForToday) {
    workoutIsToday = workoutsForToday.some(
      (todaysWorkout) => todaysWorkout._id === workout._id
    );

    if (workoutIsToday) {
      workoutHasStarted = calcWorkoutHasStarted(workout);

      if (displayedWorkout) {
        workoutIsInProgress = displayedWorkout._id === workout._id;
      }

      if (calcWorkoutCompletion(workout) === 100) {
        workoutHasStarted = false;
      }
    }
  }

  disableWorkoutEditButton = workoutHasStarted || workoutIsInProgress;

  return (
    <>
      <Card className="w-[350px] h-[370px] overflow-hidden border-primary relative mt-5">
        <CardHeader>
          <Dumbbell />
          <div className="flex justify-between">
            <CardTitle>{workout.workoutName}</CardTitle>
            <CardDescription>{workout.day}</CardDescription>
          </div>
          {workoutIsToday ? (
            <Progress value={calcWorkoutCompletion(workout)} className="h-1" />
          ) : null}
        </CardHeader>

        <div className="relative flex-grow overflow-hidden h-[170px]">
          <div className="flex justify-between">
            <CardDescription className="ml-10">Name</CardDescription>
            <CardDescription className="mr-20">Sets</CardDescription>
          </div>
          <div className="overflow-hidden">
            <CardContent className="relative h-full pr-4">
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between">
                  <div className="flex-1">
                    <p className="tracking-widest">{exercise.name}</p>
                  </div>
                  <div className="flex-1 text-right mr-[50px]">
                    <p>{exercise.sets}</p>
                  </div>
                  <div className="w-[1.25rem] flex justify-center"></div>
                </div>
              ))}
            </CardContent>
          </div>
        </div>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          {workoutsForToday ? (
            disableWorkoutEditButton ? (
              <Button
                className="ml-3"
                onClick={() => handleEditClick(workout)}
                disabled
              >
                <Pencil size={16} className="mr-2" />
                Edit Workout
              </Button>
            ) : (
              <Button className="ml-3" onClick={() => handleEditClick(workout)}>
                <Pencil size={16} className="mr-2" />
                Edit Workout
              </Button>
            )
          ) : (
            <Button className="ml-3" onClick={() => handleEditClick(workout)}>
              <Pencil size={16} className="mr-2" />
              Edit Workout
            </Button>
          )}

          <div className="mt-1">
            <CardDescription className="whitespace-nowrap">
              Last Updated: {formatDate(workout.updatedAt)}
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
      <WorkoutDeletionWarning
        open={showDeletionWarning}
        handleClose={handleClose}
        handleDeleteClick={handleDeleteClick}
        workoutForDeletion={workout}
      />
    </>
  );
}

export default WorkoutCard;
