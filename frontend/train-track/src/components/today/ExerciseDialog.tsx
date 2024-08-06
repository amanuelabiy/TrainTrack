import { Exercise, WorkingSet } from "@/types/workoutTypes";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { TodayWorkout } from "./TodayWorkoutCard";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useAppDispatch } from "@/hooks";
import { handleDialogSaveClick } from "@/features/todaysWorkout/todaysWorkoutSlice";
import { toast } from "react-toastify";

interface ExerciseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise;
  workout: TodayWorkout;
}

function ExerciseDialog({
  isOpen,
  onClose,
  exercise,
  workout,
}: ExerciseDialogProps) {
  const numberOfWorkingSets = exercise.sets;
  const dispatch = useAppDispatch();

  const [workingSets, setWorkingSets] = useState(
    Array.isArray(exercise.workingSets) && exercise.workingSets.length > 0
      ? exercise.workingSets
      : Array.from({ length: numberOfWorkingSets }, () => ({
          weight: 0,
          reps: 0,
          completed: false,
        }))
  );

  const handleInputChange = (
    index: number,
    field: string,
    value: number | boolean
  ) => {
    let parsedValue: number | boolean;

    if (field === "weight" || field === "reps") {
      parsedValue = Number(value);
    } else {
      parsedValue = Boolean(value);
    }

    setWorkingSets((prevWorkingSets) =>
      prevWorkingSets.map((set, i) =>
        i === index ? { ...set, [field]: parsedValue } : set
      )
    );
  };

  const handleWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = Number(event.target.value);

    if (newValue < 10000 && newValue > -1) {
      handleInputChange(index, "weight", newValue);
    }
  };

  const handleRepsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = Number(event.target.value);

    if (newValue < 100 && newValue > -1) {
      handleInputChange(index, "reps", newValue);
    }
  };

  const handleCompletedChanged = (checked: boolean, index: number) => {
    handleInputChange(index, "completed", checked);
  };

  const handleSaveClick = (workingSets: WorkingSet[]) => {
    dispatch(handleDialogSaveClick({ exercise, workingSets }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-xl">
        <DialogTitle>{exercise.name}</DialogTitle>
        <DialogDescription>Notes: {exercise.notes}</DialogDescription>
        <div>
          <div className="flex gap-[40px] ml-[60px]">
            <p className="font-bold">Set</p>
            <p className="font-bold">Prev Weight(lbs.)</p>
            <p className="font-bold">Prev Reps</p>
            <p className="font-bold">Today Weight(lbs.)</p>
            <p className="font-bold">Today Reps</p>
          </div>
          <div className="grid grid-cols-2 gap-[40px] mt-6">
            {workingSets.map((workingSet, index) => (
              <div
                className="col-span-2 flex items-center gap-[40px]"
                key={index}
              >
                <Checkbox
                  checked={workingSet.completed}
                  onCheckedChange={(checked) =>
                    handleCompletedChanged(checked as boolean, index)
                  }
                />
                <p className="ml-4">{index + 1}</p>
                <p className="w-36 ml-7">
                  {exercise.workingSets && exercise.workingSets.length > 0
                    ? exercise.workingSets[index].weight
                    : ""}
                </p>
                <p className="mr-5">
                  {exercise.workingSets && exercise.workingSets.length > 0
                    ? exercise.workingSets[index].reps
                    : ""}
                </p>
                <input
                  className="border p-2 w-[100px] bg-background rounded-lg"
                  type="numeric"
                  onChange={(event) => handleWeightChange(event, index)}
                  value={
                    workingSet.weight === 0 && !workingSet.completed
                      ? ""
                      : workingSet.weight
                  }
                />
                <input
                  className="border p-2 w-[50px] bg-background rounded-lg"
                  type="numeric"
                  onChange={(event) => handleRepsChange(event, index)}
                  value={
                    workingSet.reps === 0 && !workingSet.completed
                      ? ""
                      : workingSet.reps
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClose();
              handleSaveClick(workingSets);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseDialog;
