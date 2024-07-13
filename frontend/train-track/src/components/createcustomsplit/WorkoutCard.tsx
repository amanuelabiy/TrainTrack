import { Workout } from "@/types/workoutTypes";
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

interface WorkoutCardProps {
  workout: Workout;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}

function WorkoutCard({
  workout,
  handleEditClick,
  handleDeleteClick,
}: WorkoutCardProps) {
  return (
    <Card className="max-w-[350px] max-h-[350px]">
      <CardHeader>
        <Dumbbell />
        <CardTitle>{workout.workoutName}</CardTitle>
        <CardDescription>{workout.notes}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div>
        <div>
          {workout.exercises.map((name, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{}</p>
                <p className="text-sm text-muted-foreground">{}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end">
          <Button variant="destructive" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button className="" onClick={handleEditClick}>
            <Pencil size={16} className="mr-2" />
            Edit Workout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default WorkoutCard;
