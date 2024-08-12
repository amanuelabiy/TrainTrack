import { useAppDispatch } from "@/hooks";
import { Button } from "../ui/button";
import { startTodaysWorkout } from "@/features/todaysWorkout/todaysWorkoutSlice";
import { handleRestartWorkoutClick } from "@/features/todaysWorkout/todaysWorkoutSlice";
import { TodayWorkout } from "./TodayWorkoutCard";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import stopHand from "@/assets/pngtree-palm-hand-stop-icon-signal-png-image_5284600.png";

interface RestartWorkoutBtnProps {
  workout: TodayWorkout;
}

function RestartWorkoutBtn({ workout }: RestartWorkoutBtnProps) {
  const dispatch = useAppDispatch();

  const handleWorkoutRestart = async () => {
    await dispatch(handleRestartWorkoutClick(workout));
  };
  return (
    <div className="flex justify-center gap-4 mb-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="align-center w-56">
            Restart Workout
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="font-bold text-center text-red-600">
            Warning!
          </DialogTitle>
          <div className="mx-auto">
            <img src={stopHand} className="h-50 w-60 object-contain"></img>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">Are you sure you want to restart?</p>
            <DialogDescription>
              (Restarting will lose all current data for this workout)
            </DialogDescription>
          </div>
          <div className="flex justify-center gap-4">
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <Button variant="outline" onClick={handleWorkoutRestart}>
              Restart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => dispatch(startTodaysWorkout(workout))}
        className="align-center w-56"
      >
        Edit Workout
      </Button>
    </div>
  );
}

export default RestartWorkoutBtn;
