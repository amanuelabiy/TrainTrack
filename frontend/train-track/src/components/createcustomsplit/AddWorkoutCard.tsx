import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Day, Exercise, Workout } from "@/types/workoutTypes";
import { useState } from "react";

function AddWorkoutCard({
  onAddWorkout,
}: {
  onAddWorkout: (workout: Workout) => void;
}) {
  const [workoutName, setWorkoutName] = useState("");
  const [day, setDay] = useState(Day.None);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { workoutName: "", name: "", sets: 0, reps: 0 },
    ]);
  };

  const handleExerciseChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const handleSelectChange = (value: Day) => {
    setDay(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workout = { workoutName, exercises, day };
    onAddWorkout(workout);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Workout</CardTitle>
        <CardDescription>Enter your workout details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Workout Name</Label>
              <Input
                id="name"
                placeholder="Name of your workout"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Day Of The Week</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Sunday">Sunday</SelectItem>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {exercises.map((exercise, index) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <Label htmlFor={`exercise-name-${index}`}>Exercise Name</Label>
                <Input
                  id={`exercise-name-${index}`}
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(index, "name", e.target.value)
                  }
                />
                <Label htmlFor={`exercise-sets-${index}`}>Sets</Label>
                <Input
                  type="number"
                  id={`exercise-sets-${index}`}
                  placeholder="Sets"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(index, "sets", Number(e.target.value))
                  }
                />
                <Label htmlFor={`exercise-reps-${index}`}>Reps</Label>
                <Input
                  type="number"
                  id={`exercise-reps-${index}`}
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(index, "reps", Number(e.target.value))
                  }
                />
              </div>
            ))}
          </div>
          <Button type="button" onClick={handleAddExercise} className="mt-4">
            Add Exercise
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Save Workout</Button>
      </CardFooter>
    </Card>
  );
}

export default AddWorkoutCard;
