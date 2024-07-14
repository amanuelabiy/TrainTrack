import { Button } from "../ui/button";

interface AddWorkoutBtnProps {
  handleWorkoutClick: () => void;
}

function AddWorkoutBtn({ handleWorkoutClick }: AddWorkoutBtnProps) {
  return (
    <Button
      onClick={handleWorkoutClick}
      size="lg"
      className="bg-primary text-white"
    >
      Add Workout
    </Button>
  );
}

export default AddWorkoutBtn;
