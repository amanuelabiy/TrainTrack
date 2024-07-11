import { Button } from "../ui/button";

interface AddWorkoutBtnProps {
  handleWorkoutClick: () => void;
}

function AddWorkoutBtn({ handleWorkoutClick }: AddWorkoutBtnProps) {
  return (
    <Button
      onClick={handleWorkoutClick}
      className="bg-primary text-white w-full p-6"
    >
      Add Workout
    </Button>
  );
}

export default AddWorkoutBtn;
