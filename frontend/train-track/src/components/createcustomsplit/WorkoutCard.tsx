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
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
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
  return (
    <Card className="w-[350px] h-[350px] overflow-hidden border-primary">
      <CardHeader>
        <Dumbbell />
        <div className="flex justify-between">
          <CardTitle>{workout.workoutName}</CardTitle>
          <CardDescription>{workout.day}</CardDescription>
        </div>
        <Progress value={33} className="h-1" />
      </CardHeader>

      <div className="relative flex-grow overflow-hidden">
        <div className="flex justify-between">
          <CardDescription className="ml-10">Name</CardDescription>
          <CardDescription className="mr-20">Sets</CardDescription>
        </div>
        <CardContent className="overflow-auto h-full pr-4">
          {workout.exercises.map((exercise, index) => (
            <div className="flex justify-between">
              <p className="tracking-widest">{exercise.name}</p>
              <p className="mr-20">{exercise.sets}</p>
            </div>
          ))}
        </CardContent>
      </div>
      <CardFooter className="flex justify-end items-center mt-[3rem]">
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
        <CardDescription className="ml-3 mb-3">Last Updated: </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default WorkoutCard;

//  <div>
//    {workout.exercises.map((name, index) => (
//      <div
//        key={index}
//        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
//      >
//        <div className="space-y-1">
//          {/* <p className="text-sm font-medium leading-none">{}</p>
//                 <p className="text-sm text-muted-foreground">{}</p> */}
//        </div>
//      </div>
//    ))}
//  </div>;

// <div className=" flex items-center space-x-4 rounded-md border p-4">
//   <div className="flex-1 space-y-1">
//     <p className="text-sm font-medium leading-none">Push Notifications</p>
//     <p className="text-sm text-muted-foreground">
//       Send notifications to device.
//     </p>
//   </div>
// </div>;
