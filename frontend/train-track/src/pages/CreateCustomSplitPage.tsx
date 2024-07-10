import AddWorkoutBtn from "@/components/createcustomsplit/AddWorkoutBtn";

import AddWorkoutCard from "@/components/createcustomsplit/AddWorkoutCard";
import { Workout } from "@/types/workoutTypes";
import { useState } from "react";

function CreateCustomSplitPage() {
  const [showAddWorkoutCard, setShowAddWorkoutCard] = useState(false);

  const handleAddWorkoutClick = () => {
    setShowAddWorkoutCard(true);
  };

  const onAddWorkout = (workout: Workout) => {
    console.log(workout);
  };

  return (
    <div className="flex flex-col h-full">
      {/* <AddWorkoutCard /> */}

      {showAddWorkoutCard && <AddWorkoutCard onAddWorkout={onAddWorkout} />}
      <div className="mt-auto mx-auto mb-10 ">
        <AddWorkoutBtn handleWorkoutClick={handleAddWorkoutClick} />
      </div>
    </div>
  );
}

export default CreateCustomSplitPage;
