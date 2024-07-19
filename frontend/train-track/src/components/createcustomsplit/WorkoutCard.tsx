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
import { FaCheckCircle } from "react-icons/fa";
import { calcWorkoutCompletion } from "@/utils/calcWorkoutCompletion";
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

  console.log(calcWorkoutCompletion(workout));

  return (
    <Card className="w-[350px] h-[370px] overflow-hidden border-primary relative mt-5">
      <CardHeader>
        <Dumbbell />
        <div className="flex justify-between">
          <CardTitle>{workout.workoutName}</CardTitle>
          <CardDescription>{workout.day}</CardDescription>
        </div>
        <Progress value={calcWorkoutCompletion(workout)} className="h-1" />
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
                <div className="w-[1.25rem] flex justify-center">
                  {exercise.completed ? (
                    <FaCheckCircle className="text-primary text-[1.25rem]" />
                  ) : (
                    <div className="text-[1.25rem]" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </div>
      </div>

      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          variant="destructive"
          onClick={() => handleDeleteClick(workout)}
        >
          Delete
        </Button>
        <Button className="ml-3" onClick={() => handleEditClick(workout)}>
          <Pencil size={16} className="mr-2" />
          Edit Workout
        </Button>
        <div className="mt-1">
          <CardDescription className="whitespace-nowrap">
            Last Updated: {formatDate(workout.updatedAt)}
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
}

export default WorkoutCard;
