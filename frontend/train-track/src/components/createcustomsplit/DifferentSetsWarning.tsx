import { type UpdatedWorkout } from "@/types/workoutTypes";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import stopHand from "@/assets/pngtree-palm-hand-stop-icon-signal-png-image_5284600.png";

interface DifferentSetsWarningProps {
  open: boolean;
  updatedWorkout: UpdatedWorkout | null;
  handleSaveWorkout: (updatedWorkout: UpdatedWorkout) => void;
  handleClose: () => void;
}

function DifferentSetsWarning({
  open,
  updatedWorkout,
  handleSaveWorkout,
  handleClose,
}: DifferentSetsWarningProps) {
  const handleConfirm = () => {
    if (updatedWorkout) {
      handleSaveWorkout(updatedWorkout);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle className="font-bold text-center text-red-600">
          Warning!
        </DialogTitle>
        <div className="mx-auto">
          <img
            src={stopHand}
            className="h-50 w-60 object-contain"
            alt="Different Sets Warning"
          ></img>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="font-bold">
            Changing Number of Sets From Original Will Delete Any Currently
            Being Tracked Data
          </p>
          <DialogDescription>(Please Confirm Change)</DialogDescription>
        </div>
        <div className="flex justify-center gap-4">
          <DialogTrigger asChild>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogTrigger>
          <Button variant="outline" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DifferentSetsWarning;
