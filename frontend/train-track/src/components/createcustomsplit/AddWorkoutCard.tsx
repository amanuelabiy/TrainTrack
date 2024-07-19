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
  onAddWorkout: (newWorkout: Workout) => void;
  handleCancelClick: (cancelWorkout: WorkoutResponse | undefined) => void;
  handleNoWorkoutCancel: () => void;
}

function AddWorkoutCard({
  workout,
  handleSaveWorkout,
  onAddWorkout,
  handleCancelClick,
  handleNoWorkoutCancel,
}: AddWorkoutCardProps) {
  const [workoutName, setWorkoutName] = useState(workout?.workoutName || "");
  const [day, setDay] = useState(workout?.day || Day.None);
  const [exercises, setExercises] = useState<Exercise[]>(
    workout?.exercises || []
  );
  const [notes, setNotes] = useState(workout?.notes || "");

  const { isEditing = false } = workout || {};

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        workoutName: workoutName,
        name: "",
        sets: 0,
        reps: 0,
        weight: 0,
        notes: "",
        completed: false,
      },
    ]);
  };

  const handleDeleteExercise = (index: number) => {
    setExercises((prevExercises) =>
      prevExercises.filter((_, i) => i !== index)
    );
  };

  const handleExerciseChange = (
    index: number,
    field: string,
    value: string | number | boolean
  ) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const handleSelectChange = (value: Day) => {
    setDay(value);
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workout = { workoutName, exercises, day, notes };

    onAddWorkout(workout);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (workout) {
      const { _id, __v, createdAt, updatedAt } = workout;
      const updatedWorkout = {
        _id,
        workoutName,
        exercises,
        day,
        notes,
        __v,
        createdAt,
        updatedAt,
      };

      handleSaveWorkout(updatedWorkout);
    } else {
      console.log("No workout is avaliable");
    }
  };

  const handleCheckBoxChange = () => {};

  return (
    <Card className="w-[350px] h-[480px] flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Workout" : "Create Workout"}</CardTitle>
        <CardDescription>Enter your workout details below.</CardDescription>
      </CardHeader>
      <CardContent
        className="flex-grow overflow-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <form
          onSubmit={workout ? handleEditSubmit : handleAddSubmit}
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
                  value={exercise.name || ""}
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
                <Label htmlFor={`exercise-notes-${index}`}>Notes</Label>
                <Input
                  id={`exercise-notes-${index}`}
                  placeholder="Enter Exercise Notes"
                  value={exercise.notes || ""}
                  onChange={(e) =>
                    handleExerciseChange(index, "notes", e.target.value)
                  }
                  autoComplete="off"
                />
                <div className="flex gap-3">
                  <Input
                    id={`exercise-completed-${index}`}
                    type="checkbox"
                    className="w-4 h-4"
                    checked={exercise.completed}
                    onChange={(e) =>
                      handleExerciseChange(index, "completed", e.target.checked)
                    }
                  />
                  <Label htmlFor={`exercise-completed-${index}`}>
                    Mark as Complete
                  </Label>
                </div>
                <Button
                  className="w-full mx-auto"
                  type="button"
                  variant="destructive"
                  onClick={() => handleDeleteExercise(index)}
                >
                  Delete Exercise
                </Button>
              </div>
            ))}
          </div>
          <Button className="mt-4" type="button" onClick={handleAddExercise}>
            Add Exercise
          </Button>
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="mt-1 block w-full border-primary focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
              rows={3}
              placeholder={notes ? notes : "Enter your notes here"}
              value={notes || ""}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <CardFooter className="flex justify-between items-center mt-4">
            <Button
              className=""
              variant="outline"
              onClick={
                workout
                  ? () => handleCancelClick(workout)
                  : handleNoWorkoutCancel
              }
            >
              Cancel
            </Button>
            {workout ? (
              <>
                <Button type="submit" className="mr-3">
                  Save Workout
                </Button>
              </>
            ) : (
              <>
                <Button type="submit" className="mr-3">
                  Add Workout
                </Button>
              </>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddWorkoutCard;
