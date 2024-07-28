import { Exercise } from "@/types/workoutTypes";
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

interface ExerciseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise;
  workout: TodayWorkout;
  handleDialogSaveClick: () => void;
}

function ExerciseDialog({
  isOpen,
  onClose,
  exercise,
  workout,
  handleDialogSaveClick,
}: ExerciseDialogProps) {
  const numberOfWorkingSets = exercise.sets;

  const [workingSets, setWorkingSets] = useState(
    exercise.workingSets ||
      Array.from({ length: numberOfWorkingSets }, () => ({
        weight: 0,
        reps: 0,
        completed: false,
      }))
  );

  const handleInputChange = (index: number, field: string, value: string) => {
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
    handleInputChange(index, "weight", event.target.value);

    console.log(workingSets);
  };

  const handleRepsChange = (event) => {};

  const handleSaveClick = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-xl">
        <DialogTitle>{exercise.name}</DialogTitle>
        <DialogDescription>Notes: {exercise.notes}</DialogDescription>
        <div>
          <div className="flex gap-[60px]">
            <p className="font-bold text-white">Set</p>
            <p className="font-bold text-white">Prev Weight(lbs.)</p>
            <p className="font-bold text-white">Prev Reps</p>
            <p className="font-bold text-white">Today Weight(lbs.)</p>
            <p className="font-bold text-white">Today Reps</p>
          </div>
          <div className="grid grid-cols-2 gap-[40px] mt-6">
            {workingSets && workingSets.length > 0 && exercise.workingSets
              ? workingSets.map((workingSet, index) => (
                  <div
                    className="col-span-2 flex items-center gap-[40px]"
                    key={index}
                  >
                    <p className="w-10">{index + 1}</p>
                    <p className="w-36 ml-6">{workingSet.weight}</p>
                    <p className="mr-[50px]">{workingSet.reps}</p>
                    <input
                      className="border p-2 w-[100px] text-black"
                      type="number"
                      onChange={(event) => handleWeightChange(event, index)}
                    />
                    <input
                      className="border p-2 w-[50px] text-black"
                      type="number"
                      onChange={(index) => handleRepsChange(index)}
                    />
                  </div>
                ))
              : Array.from({ length: numberOfWorkingSets }).map((_, index) => (
                  <div
                    className="col-span-2 flex items-center gap-[40px]"
                    key={index}
                  >
                    <p className="w-10">{index + 1}</p>
                    <p className="w-36 ml-6"></p>
                    <p className="mr-[50px]"></p>
                    <input
                      className="border p-2 w-[100px] text-black"
                      type="number"
                    />
                    <input
                      className="border p-2 w-[50px] text-black"
                      type="number"
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
              handleSaveClick();
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
