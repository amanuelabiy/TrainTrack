import AddWorkoutBtn from "@/components/createcustomsplit/AddWorkoutBtn";

import AddWorkoutCard from "@/components/createcustomsplit/AddWorkoutCard";
import { Workout } from "@/types/workoutTypes";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addWorkout } from "@/features/workoutPlan/workoutPlanSlice";
import { RootState } from "@/store";
import WorkoutCard from "@/components/createcustomsplit/WorkoutCard";

function CreateCustomSplitPage() {
  const [showAddWorkoutCard, setShowAddWorkoutCard] = useState(false);
  const dispatch = useAppDispatch();

  const workouts = useAppSelector(
    (state: RootState) => state.workoutPlanState.workouts
  );

  const handleAddWorkoutClick = () => {
    setShowAddWorkoutCard(true);
  };

  const onAddWorkout = (workout: Workout) => {
    dispatch(addWorkout(workout));
    setShowAddWorkoutCard(false);
    console.log(workouts);
  };

  const handleCancelClick = () => {
    setShowAddWorkoutCard(false);
  };

  return (
    <div className="flex flex-col h-full">
      {workouts.map((workout, index) => (
        <div key={index}>
          <WorkoutCard workout={workout} />
        </div>
      ))}
      {showAddWorkoutCard && (
        <AddWorkoutCard
          onAddWorkout={onAddWorkout}
          handleCancelClick={handleCancelClick}
        />
      )}
      <div className="mt-auto mx-auto mb-10 ">
        <AddWorkoutBtn handleWorkoutClick={handleAddWorkoutClick} />
      </div>
    </div>
  );
}

export default CreateCustomSplitPage;
