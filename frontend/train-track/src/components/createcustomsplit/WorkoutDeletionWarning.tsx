import stopHand from "@/assets/pngtree-palm-hand-stop-icon-signal-png-image_5284600.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { WorkoutResponse } from "@/types/workoutTypes";

interface WorkoutDeletionWarning {
  open: boolean;
  handleClose: () => void;
  handleDeleteClick: (workout: WorkoutResponse) => void;
  workoutForDeletion: WorkoutResponse;
}

function WorkoutDeletionWarning({
  open,
  handleClose,
  handleDeleteClick,
  workoutForDeletion,
}: WorkoutDeletionWarning) {
  const handleDelete = () => {
    handleDeleteClick(workoutForDeletion);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle className="font-bold text-center text-red-600">
          Warning!
        </DialogTitle>
        <div className="mx-auto">
          <img src={stopHand} className="h-50 w-60 object-contain"></img>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="font-bold">Are you sure you want to delete?</p>
          <DialogDescription>
            (You will be able to view workout in{" "}
            <span className="font-bold">history only</span>)
          </DialogDescription>
        </div>
        <div className="flex justify-center gap-4">
          <DialogTrigger asChild>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogTrigger>
          <Button variant="outline" onClick={handleDelete}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WorkoutDeletionWarning;
