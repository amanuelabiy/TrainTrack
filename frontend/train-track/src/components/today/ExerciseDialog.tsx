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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-xl">
        <DialogHeader>{exercise.name}</DialogHeader>
        <DialogDescription>
          <div className="flex gap-[60px]">
            <p className="font-bold text-white">Set</p>
            <p className="font-bold text-white">Prev Weight(lbs.)</p>
            <p className="font-bold text-white">Prev Reps</p>
            <p className="font-bold text-white">Today Weight(lbs.)</p>
            <p className="font-bold text-white">Today Reps</p>
          </div>
          <div className="grid grid-cols-2 gap-[40px] mt-6">
            {exercise.workingSets
              ? exercise.workingSets.map((workingSet, index) => (
                  <div
                    className="col-span-2 flex items-center gap-[40px]"
                    key={index}
                  >
                    <p className="w-10">{index + 1}</p>
                    <p className="w-36 ml-6">{workingSet.weight}</p>
                    <p className="mr-[50px]">{workingSet.reps}</p>
                    <input
                      className="border p-2 w-[100px]"
                      placeholder="Weight"
                      type="number"
                      defaultValue={workingSet.weight}
                    />
                    <input
                      className="border p-2 w-[50px]"
                      placeholder="Reps"
                      type="number"
                      defaultValue={workingSet.reps}
                    />
                  </div>
                ))
              : Array.from({ length: numberOfWorkingSets }).map((_, index) => (
                  <div
                    className="col-span-2 flex items-center gap-[40px]"
                    key={index}
                  >
                    <p className="w-10">{index + 1}</p>
                    <p className="w-36 ml-6">No Data</p>
                    <p className="mr-[50px]">No Data</p>
                    <input
                      className="border p-2 w-[10px]"
                      placeholder="Weight"
                      type="number"
                    ></input>
                    <input
                      className="border p-2 w-[10px]"
                      placeholder="Reps"
                      type="number"
                    ></input>
                  </div>
                ))}
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              /* handle save logic here */
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
