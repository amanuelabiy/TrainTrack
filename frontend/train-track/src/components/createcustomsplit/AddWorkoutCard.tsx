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
import {
  Day,
  type Exercise,
  Workout,
  type WorkoutResponse,
} from "@/types/workoutTypes";
import { useState } from "react";

interface AddWorkoutCardProps {
  workout?: WorkoutResponse;
  handleSaveWorkout: (updatedWorkout: WorkoutResponse) => void;
  onAddWorkout: (workout: Workout) => void;
  handleCancelClick: (cancelWorkout: WorkoutResponse | undefined) => void;
}

function AddWorkoutCard({
  workout,
  handleSaveWorkout,
  onAddWorkout,
  handleCancelClick,
}: AddWorkoutCardProps) {
  const [workoutName, setWorkoutName] = useState(workout?.workoutName || "");
  const [day, setDay] = useState(workout?.day || Day.None);
  const [exercises, setExercises] = useState<Exercise[]>(
    workout?.exercises || []
  );

  const { isEditing } = workout;

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        workoutName: workoutName,
        name: "",
        sets: 0,
        reps: 0,
        weight: 0,
      },
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
    <Card className="w-[350px] flex flex-col">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Workout" : "Create Workout"}</CardTitle>
        <CardDescription>Enter your workout details below.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full justify-between"
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Workout Name</Label>
              <Input
                id="name"
                placeholder="Name of your workout"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Day Of The Week</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger id="framework">
                  <SelectValue
                    placeholder={day === Day.None ? "Select" : day}
                  />
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
                  autoComplete="off"
                />
                <Label htmlFor={`exercise-sets-${index}`}>Sets</Label>
                <Input
                  type="number"
                  id={`exercise-sets-${index}`}
                  placeholder="Sets"
                  value={exercise.sets >= 0 ? exercise.sets : 0}
                  onChange={(e) =>
                    handleExerciseChange(index, "sets", Number(e.target.value))
                  }
                />
                <Label htmlFor={`exercise-reps-${index}`}>Reps</Label>
                <Input
                  type="number"
                  id={`exercise-reps-${index}`}
                  placeholder="Reps"
                  value={exercise.reps >= 0 ? exercise.reps : 0}
                  onChange={(e) =>
                    handleExerciseChange(index, "reps", Number(e.target.value))
                  }
                />
              </div>
            ))}
          </div>
          <Button className="mt-4" type="button" onClick={handleAddExercise}>
            Add Exercise
          </Button>
          <CardFooter className="flex justify-between items-center mt-4">
            <Button
              className=""
              variant="outline"
              onClick={() => handleCancelClick(workout)}
            >
              Cancel
            </Button>

            <Button type="submit" className="mr-3">
              Save Workout
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddWorkoutCard;
